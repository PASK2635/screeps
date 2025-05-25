type CreepConfig = {
  amount: number;
  body: BodyPartConstant[];
  role: { run: (creep: Creep) => void };
};

type CreepConfigs = {
  [name: string]: CreepConfig;
};
