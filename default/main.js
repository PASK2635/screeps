"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = loop;
const coordinator_1 = require("./coordinator");
const minion_1 = require("./minion");
function loop() {
    const rooms = Object.values(Game.rooms);
    for (const room of rooms) {
        const coordinator = new coordinator_1.default(room);
        const creepsInRoom = Object.values(Game.creeps).filter((creep) => creep.room.name === room.name);
        const minions = creepsInRoom.map((creep) => new minion_1.default(creep, coordinator));
        for (const minion of minions) {
            minion.say("TEST");
        }
    }
}
//# sourceMappingURL=main.js.map