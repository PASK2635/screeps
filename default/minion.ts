import Coordinator from "./coordinator";

export default class Minion extends Creep {
  constructor(private creep: Creep, private coordinator: Coordinator) {
    super(creep.id);
  }
}
