import Coordinator from "./coordinator";

const isBuildTask = (task: Task): task is Build => {
  return (task as Build).name === "BUILD";
};

const isHarvestTask = (task: Task): task is Build => {
  return (task as Build).name === "BUILD";
};

export default class Minion extends Creep {
  constructor(private creep: Creep, private coordinator: Coordinator) {
    super(creep.id);
  }

  private isPossible(task: Task): boolean {
    if (isBuildTask(task) && this.store[RESOURCE_ENERGY] == 0) {
      console.log(`${this.name} - COULD NOT BUILD`);
      return false;
    }

    if (isHarvestTask(task) && this.store.getFreeCapacity() === 0) {
      console.log(`${this.name} - COULD NOT HARVEST`);
      return false;
    }
    console.log(`${this.name} - CAN DO ANYTHING`);

    return true;
  }

  public run(): void {
    const task = this.memory.task ?? this.coordinator.getTask();
    this.memory.task = task;

    if (!task) {
      this.say(`❌ No tasks`);
      return;
    }

    const target = Game.getObjectById(task.targetId);
    if (!target) {
      this.say("😕 No target");
      return;
    }
    switch (task.name) {
      case "HARVEST": {
        this.harvest(target as unknown as Source);
      }
      case "BUILD": {
        this.build(target as unknown as ConstructionSite);
      }
    }
    this.moveTo(target, {
      visualizePathStyle: { stroke: "#ffffff" },
    });
  }
}
