let spawner: {
  run(spawner: StructureSpawn, options: CreepConfigs): void;
};

export default spawner = {
  run: (spawner: StructureSpawn, options: CreepConfigs) => {
    const creepsWithRole = Object.values(Game.creeps).filter(
      (creep) => creep.memory.role === options.role
    );
    if (creepsWithRole.length < options.amount) {
      const name = `${options.role} - ${Game.time}`;

      const spawning = spawner.spawnCreep(options.body, name, {
        memory: { role: options.role },
      });
      if (spawning === OK) {
        console.log(`Spawning new ${options.role}: ${name}`);
      }
    }
  },
};
