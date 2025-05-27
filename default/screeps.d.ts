declare global {
  interface CreepMemory {
    [name: string]: any;
    role: string;
    building?: boolean;
    upgrading?: boolean;
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
