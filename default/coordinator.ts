// TODO: Creeps should assign themselves to jobs which is then saved in memory. This way of "give a creep a job" makes it impossible to keep an overview of what's being done.
export default class Coordinator {
  constructor(public room: Room) {}

  private getMemory(): CoordinatorMemory {
    if (!Memory.coordinators) {
      Memory.coordinators = {};
    }
    if (!Memory.coordinators[this.room.name]) {
      Memory.coordinators[this.room.name] = { tasks: [] };
    }
    return Memory.coordinators[this.room.name];
  }

  private getNewUpgraderTasks(): Upgrade[] {
    if (!this.room.controller) return [];
    const existingUpgraderTasks = this.getMemory().tasks.filter(
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
    const memory = this.getMemory();
    const harvestTasks = memory.tasks.filter(
      (task): task is Harvest => task.name === "HARVEST"
    );
    const newHarvestTasks = targets.filter(
      (target) =>
        !harvestTasks.some(
          (existingTask) => existingTask.targetId === target.id
        )
    );
    return newHarvestTasks.map((target) => {
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
    const existingBuildTasks = this.getMemory().tasks.filter(
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
    const existingBuildTasks = this.getMemory().tasks.filter(
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

  public findNewTasks(): void {
    const harvest = this.getNewHarvestTasks();
    const upgrader = this.getNewUpgraderTasks();
    const upkeep = this.getNewUpkeepTasks();
    const build = this.getNewBuildTasks();
    this.getMemory().tasks.push(
      ...[...build, ...upgrader, ...upkeep, ...harvest]
    );
  }

  public getTask(
    minionId: Id<Creep>,
    isPossible: (task: Task) => boolean
  ): Task | undefined {
    const memory = this.getMemory();
    const existingTask = memory.tasks.find(
      (task) => task.assignedTo === minionId
    );
    if (existingTask) {
      console.log(
        `Minion ${minionId} already has task: ${JSON.stringify(existingTask)}`
      );
      return existingTask;
    }

    const indexOfNewTask = memory.tasks.findIndex((task) => isPossible(task));
    const task = memory.tasks[indexOfNewTask];
    task.assignedTo = minionId;
    console.log(`Gave task - ${JSON.stringify(task)}`);
    return task;
  }

  public markTaskAsDone(minionId: Id<Creep>): void {
    const existingTask = this.getMemory().tasks.find(
      (task) => task.assignedTo === minionId
    );
    if (!existingTask) return;
    existingTask.assignedTo = undefined;
  }
}
