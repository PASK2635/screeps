let roleSpawner: {
  run(spawner: StructureSpawn, options: CreepConfigs): void;
};

export default roleSpawner = {
  run: (spawner: StructureSpawn, options: CreepConfigs) => {
    for (const [role, { amount, body }] of Object.entries(options)) {
      const creepsWithRole = Object.values(Game.creeps).filter(
        (creep) => creep.memory.role === role
      );
      if (creepsWithRole.length < amount) {
        const name = `${role} - ${Game.time}`;
        console.log(`Spawning new ${role}: ${name}`);
        spawner.spawnCreep(body, name, { memory: { role } });
      }
    }
  },
};
