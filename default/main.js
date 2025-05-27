"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = loop;
const coordinator_1 = require("./coordinator");
const minion_1 = require("./minion");
const spawner_1 = require("./spawner");
const garbageCollection = () => {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
};
function loop() {
    garbageCollection();
    const rooms = Object.values(Game.rooms);
    const spawnerInstance = Game.spawns["Initial_Spawner"];
    spawner_1.default.run(spawnerInstance, {
        amount: 1,
        body: [WORK, CARRY, MOVE],
        role: "minion",
    });
    for (const room of rooms) {
        const coordinator = new coordinator_1.default(room);
        coordinator.monitor();
        const creepsInRoom = Object.values(Game.creeps).filter((creep) => creep.room.name === room.name);
        const minions = creepsInRoom.map((creep) => new minion_1.default(creep, coordinator));
        for (const minion of minions) {
            minion.run();
        }
    }
}
//# sourceMappingURL=main.js.map