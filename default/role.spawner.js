const role = {
  /**
   * Execute the spawner script
   * @param {StructureSpawn} spawner
   * @param {*} options
   */
  run: (spawner, options) => {
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

module.exports = role;
