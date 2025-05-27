import Coordinator from "./coordinator";
import Minion from "./minion";
import spawner from "./spawner";

const garbageCollection = () => {
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }
};

export function loop() {
  garbageCollection();
  const rooms = Object.values(Game.rooms);

  const spawnerInstance = Game.spawns["Initial_Spawner"];
  spawner.run(spawnerInstance, {
    amount: 4,
    body: [WORK, CARRY, MOVE],
    role: "minion",
  });

  for (const room of rooms) {
    const coordinator = new Coordinator(room);
    coordinator.monitor();
    const creepsInRoom = Object.values(Game.creeps).filter(
      (creep) => creep.room.name === room.name
    );
    const minions = creepsInRoom.map((creep) => new Minion(creep, coordinator));
    for (const minion of minions) {
      minion.run();
    }
  }
}
