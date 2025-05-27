export default class Coordinator {
  private memory: CoordinatorMemory;
  constructor(public room: Room) {
    this.memory = Memory.coordinators?.[room.name] ?? {
      // TODO: Memory doesn't work.
      tasks: [],
    };
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

  private getNewBuildTasks(): Build[] {
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
    const build = this.getNewBuildTasks();
    this.memory.tasks.push(...[...build, ...harvest]);
  }

  public add(task: Task) {
    this.memory.tasks.push(task);
  }

  public getTask(): Task | undefined {
    return this.memory.tasks.pop();
  }
}
