"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let roleSpawner;
exports.default = roleSpawner = {
    run: (spawner, options) => {
        for (const [role, { amount, body }] of Object.entries(options)) {
            const creepsWithRole = Object.values(Game.creeps).filter((creep) => creep.memory.role === role);
            if (creepsWithRole.length < amount) {
                const name = `${role} - ${Game.time}`;
                console.log(`Spawning new ${role}: ${name}`);
                spawner.spawnCreep(body, name, { memory: { role } });
            }
        }
    },
};
//# sourceMappingURL=role.spawner.js.map