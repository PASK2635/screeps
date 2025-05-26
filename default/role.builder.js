"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let roleBuilder;
const building = (creep) => {
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
const harvesting = (creep) => {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
    if (creep.store.getFreeCapacity() == 0) {
        creep.memory.state = states.building.name;
    }
};
const states = {
    building: { name: "building", execute: building },
    harvesting: { name: "harvesting", execute: harvesting },
};
exports.default = roleBuilder = {
    run(creep) {
        var _a;
        const state = (_a = creep.memory.state) !== null && _a !== void 0 ? _a : states.harvesting.name;
        creep.say(state);
        states[state].execute(creep);
    },
};
//# sourceMappingURL=role.builder.js.map