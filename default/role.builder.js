"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let roleBuilder;
const building = (creep) => {
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
const harvesting = (creep, state) => {
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
const states = {
    building: { name: "building", emoji: "🚧", execute: building },
    harvesting: { name: "harvesting", emoji: "♻️", execute: harvesting },
};
exports.default = roleBuilder = {
    run(creep) {
        var _a;
        const state = states[(_a = creep.memory.state) !== null && _a !== void 0 ? _a : states.harvesting.name];
        state.execute(creep, state);
    },
};
//# sourceMappingURL=role.builder.js.map