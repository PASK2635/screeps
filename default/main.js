const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleSpawner = require("role.spawner");

const creepConfig = {
  harvester: { amount: 4, body: [WORK, CARRY, MOVE], role: roleHarvester },
  upgrader: { amount: 2, body: [WORK, CARRY, MOVE], role: roleUpgrader },
  builder: { amount: 2, body: [WORK, CARRY, MOVE], role: roleBuilder },
};

module.exports.loop = function () {
  const spawner = Game.spawns["Initial_Spawner"];
  roleSpawner.run(spawner, creepConfig);

  for (var name in Game.creeps) {
    const creep = Game.creeps[name];
    config = creepConfig[creep.memory.role];
    config.role.run(creep);
  }
};
