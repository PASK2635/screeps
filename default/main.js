const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleSpawner = require("role.spawner");

module.exports.loop = function () {
  const spawner = Game.spawns["Initial_Spawner"];
  roleSpawner.run(spawner, {
    limits: [
      { role: "harvester", limit: { amount: 2, body: [WORK, CARRY, MOVE] } },
      { role: "upgrader", limit: { amount: 1, body: [WORK, CARRY, MOVE] } },
    ],
  });

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
