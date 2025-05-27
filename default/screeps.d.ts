declare global {
  interface CreepMemory {
    [name: string]: any;
    role: string;
    task?: Task;
  }

  interface CoordinatorMemory {
    tasks: Task[];
  }

  interface Memory {
    creeps: { [name: string]: CreepMemory };
    coordinators?: { [room: string]: CoordinatorMemory };
  }
}

export {};
