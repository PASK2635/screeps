const role = {
  /**
   * Execute the spawner script
   * @param {StructureSpawn} spawner
   * @param {{limits}} options
   */
  run: (spawner, { limits }) => {
    for (const [role, { amount, body }] in Object.entries(limits)) {
      const creepsWithRole = Object.values(Game.creeps).filter(
        (creep) => creep.memory.role === role
      );
      if (creepsWithRole < amount) {
        const name = `${role} - ${Game.time}`;
        spawner.spawnCreep(body, name, { memory: { role } });
      }
    }
  },
};

module.exports = role;
