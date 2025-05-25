import roleHarvester from "./role.harvester";
import roleUpgrader from "./role.upgrader";
import roleBuilder from "./role.builder";
import roleSpawner from "./role.spawner";

const creepConfig: CreepConfigs = {
  harvester: { amount: 1, body: [WORK, CARRY, MOVE], role: roleHarvester },
  upgrader: { amount: 1, body: [WORK, CARRY, MOVE], role: roleUpgrader },
  builder: { amount: 3, body: [WORK, CARRY, MOVE], role: roleBuilder },
};

export function loop() {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  const spawner = Game.spawns["Initial_Spawner"];
  roleSpawner.run(spawner, creepConfig);

  for (var name in Game.creeps) {
    const creep = Game.creeps[name];
    const config = creepConfig[creep.memory.role];
    config.role.run(creep);
  }
}
