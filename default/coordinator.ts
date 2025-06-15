// TODO: Creeps should assign themselves to jobs which is then saved in memory. This way of "give a creep a job" makes it impossible to keep an overview of what's being done.
export default class Coordinator {
  private memory: CoordinatorMemory;
  constructor(public room: Room) {
    Memory.coordinators = Memory.coordinators ?? {};
    this.memory = Memory.coordinators?.[room.name] ?? {
      // TODO: Memory doesn't work.
      tasks: [],
    };
  }

  private getNewUpgraderTasks(): Upgrade[] {
    if (!this.room.controller) return [];
    const existingUpgraderTasks = this.memory.tasks.filter(
      (task): task is Upgrade => task.name === "UPGRADE"
    );
    if (existingUpgraderTasks.length) return [];
    return [
      {
        name: "UPGRADE",
        targetId: this.room.controller.id,
      },
    ];
  }

  private getNewHarvestTasks(): Harvest[] {
    const targets = this.room.find(FIND_SOURCES);
    const existingHarvestTasks = this.memory.tasks.filter(
      (task): task is Harvest => task.name === "HARVEST"
    );
    return targets
      .filter(
        (target) =>
          !existingHarvestTasks.some(
            (existingTask) => existingTask.targetId === target.id
          )
      )
      .map((target) => {
        return {
          name: "HARVEST",
          targetId: target.id,
        } as Harvest;
      });
  }

  private getNewUpkeepTasks(): Upkeep[] {
    const targets = this.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
    const existingBuildTasks = this.memory.tasks.filter(
      (task): task is Upkeep => task.name === "UPKEEP"
    );
    return targets
      .filter(
        (target) =>
          !existingBuildTasks.some(
            (existingTask) => existingTask.targetId === target.id
          )
      )
      .map((target) => {
        return {
          name: "UPKEEP",
          targetId: target.id,
        } as Upkeep;
      });
  }

  private getNewBuildTasks(): Build[] {
    const targets = this.room.find(FIND_CONSTRUCTION_SITES);
    const existingBuildTasks = this.memory.tasks.filter(
      (task): task is Build => task.name === "BUILD"
    );
    return targets
      .filter(
        (target) =>
          !existingBuildTasks.some(
            (existingTask) => existingTask.targetId === target.id
          )
      )
      .map((target) => {
        return {
          name: "BUILD",
          targetId: target.id,
        } as Build;
      });
  }

  public monitor(): void {
    const harvest = this.getNewHarvestTasks();
    const upgrader = this.getNewUpgraderTasks();
    const upkeep = this.getNewUpkeepTasks();
    const build = this.getNewBuildTasks();
    this.memory.tasks.push(...[...build, ...upgrader, ...upkeep, ...harvest]);
    if (Memory.coordinators) {
      Memory.coordinators[this.room.name] = this.memory;
    }
  }

  public add(task: Task) {
    this.memory.tasks.push(task);
  }

  public getTask(isPossible: (task: Task) => boolean): Task | undefined {
    const index = this.memory.tasks.findIndex((task) => isPossible(task));
    const task = this.memory.tasks[index];
    console.log(`Gave task - ${JSON.stringify(task)}`);
    this.memory.tasks.splice(index, 1);
    return task;
  }
}
