import Coordinator from "./coordinator";

const isBuildTask = (task: Task): task is Build => {
  return (task as Build).name === "BUILD";
};

const isUpkeepTask = (task: Task): task is Upkeep => {
  return (task as Upkeep).name === "UPKEEP";
};

const isHarvestTask = (task: Task): task is Upkeep => {
  return (task as Harvest).name === "HARVEST";
};

const isUpgradeTask = (task: Task): task is Upgrade => {
  return (task as Upgrade).name === "UPGRADE";
};

export default class Minion extends Creep {
  constructor(private creep: Creep, private coordinator: Coordinator) {
    super(creep.id);
  }

  private isPossible(task: Task): boolean {
    if (
      isUpgradeTask(task) &&
      this.store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      console.log(`${this.name} - CAN UPGRADE`);
      return true;
    }

    if (
      isUpkeepTask(task) &&
      this.store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      console.log(`${this.name} - CAN UPKEEP`);
      return true;
    }

    if (
      isBuildTask(task) &&
      this.store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      console.log(`${this.name} - CAN BUILD`);
      return true;
    }

    if (
      isHarvestTask(task) &&
      this.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    ) {
      console.log(`${this.name} - CAN HARVEST`);
      return true;
    }

    return false;
  }

  public run(): void {
    const task = this.coordinator.getTask(
      this.creep.id,
      this.isPossible.bind(this)
    );

    if (!task) {
      this.say(`❌ No tasks`);
      return;
    }

    const target = Game.getObjectById(task.targetId);
    if (!target) {
      this.say("😕 No target");
      this.coordinator.markTaskAsDone(this.creep.id);
      return;
    }
    switch (task.name) {
      case "HARVEST": {
        this.harvest(target as unknown as Source);
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
          this.coordinator.markTaskAsDone(this.creep.id);
        }
        break;
      }
      case "UPKEEP": {
        this.transfer(target as unknown as AnyStructure, RESOURCE_ENERGY);
        if (this.store[RESOURCE_ENERGY] === 0) {
          this.coordinator.markTaskAsDone(this.creep.id);
        }
        break;
      }
      case "UPGRADE": {
        this.upgradeController(target as unknown as StructureController);
        if (this.store[RESOURCE_ENERGY] === 0) {
          this.coordinator.markTaskAsDone(this.creep.id);
        }
        break;
      }
      case "BUILD": {
        this.build(target as unknown as ConstructionSite);
        if (this.store[RESOURCE_ENERGY] === 0) {
          this.coordinator.markTaskAsDone(this.creep.id);
        }
        break;
      }
    }
    this.moveTo(target, {
      visualizePathStyle: { stroke: "#ffffff" },
    });
  }
}
