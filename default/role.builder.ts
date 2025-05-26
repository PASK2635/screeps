let roleBuilder: {
  run(creep: Creep): void;
};

const building = (creep: Creep): void => {
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length <= 0) {
    creep.say("🚧 Could not find targets");
    return;
  }
  if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(targets[0], {
      visualizePathStyle: { stroke: "#ffffff" },
    });
  }
  if (creep.store[RESOURCE_ENERGY] == 0) {
    const changeTo = states.harvesting.name;
    const state = states[changeTo];
    creep.say(`${state.emoji} ${changeTo}`);
    creep.memory.state = changeTo;
  }
};

const harvesting = (creep: Creep, state: State): void => {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
  }
  if (creep.store.getFreeCapacity() == 0) {
    const changeTo = states.building.name;
    const state = states[changeTo];
    creep.say(`${state.emoji} ${changeTo}`);
    creep.memory.state = changeTo;
  }
};

type State = {
  name: string;
  emoji: string;
  execute: (creep: Creep, state: State) => void;
};

type States = {
  [name: string]: State;
};

const states: States = {
  building: { name: "building", emoji: "🚧", execute: building },
  harvesting: { name: "harvesting", emoji: "♻️", execute: harvesting },
};

export default roleBuilder = {
  run(creep: Creep) {
    const state =
      states[(creep.memory.state as string) ?? states.harvesting.name];
    state.execute(creep, state);
  },
};
