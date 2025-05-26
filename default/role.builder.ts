let roleBuilder: {
  run(creep: Creep): void;
};

const building = (creep: Creep): void => {
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length <= 0) {
    creep.say("🚧 Could not find targets");
    return;
  }
  creep.moveTo(targets[0], {
    visualizePathStyle: { stroke: "#ffffff" },
  });
  if (creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.state = states.harvesting.name;
  }
};

const harvesting = (creep: Creep): void => {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
  }
  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.state = states.building.name;
  }
};

type State = {
  name: string;
  execute: (creep: Creep) => void;
};

type States = {
  [name: string]: State;
};

const states: States = {
  building: { name: "building", execute: building },
  harvesting: { name: "harvesting", execute: harvesting },
};

export default roleBuilder = {
  run(creep: Creep) {
    const state = (creep.memory.state as string) ?? states.harvesting.name;
    creep.say(state);
    states[state].execute(creep);
  },
};
