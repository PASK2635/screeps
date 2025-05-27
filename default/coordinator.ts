export default class Coordinator {
  private memory: CoordinatorMemory;
  constructor(private room: Room) {
    this.memory = Memory.coordinators?.[room.name] ?? {
      tasks: [],
    };
  }

  public add(task: Task) {
    this.memory.tasks.push(task);
  }

  public getTask(): Task | undefined {
    return this.memory.tasks.pop();
  }
}
