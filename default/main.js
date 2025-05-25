"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = loop;
const role_harvester_1 = require("./role.harvester");
const role_upgrader_1 = require("./role.upgrader");
const role_builder_1 = require("./role.builder");
const role_spawner_1 = require("./role.spawner");
const creepConfig = {
    harvester: { amount: 1, body: [WORK, CARRY, MOVE], role: role_harvester_1.default },
    upgrader: { amount: 1, body: [WORK, CARRY, MOVE], role: role_upgrader_1.default },
    builder: { amount: 3, body: [WORK, CARRY, MOVE], role: role_builder_1.default },
};
function loop() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    const spawner = Game.spawns["Initial_Spawner"];
    role_spawner_1.default.run(spawner, creepConfig);
    for (var name in Game.creeps) {
        const creep = Game.creeps[name];
        const config = creepConfig[creep.memory.role];
        config.role.run(creep);
    }
}
//# sourceMappingURL=main.js.map