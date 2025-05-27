import Coordinator from "./coordinator";
import Minion from "./minion";

export function loop() {
  const rooms = Object.values(Game.rooms);
  for (const room of rooms) {
    const coordinator = new Coordinator(room);
    const creepsInRoom = Object.values(Game.creeps).filter(
      (creep) => creep.room.name === room.name
    );
    const minions = creepsInRoom.map((creep) => new Minion(creep, coordinator));
    for (const minion of minions) {
      minion.say("TEST");
    }
  }
}
