type Build = {
  name: "BUILD";
  targetId: Id<AnyStructure>;
};

type Harvest = {
  name: "HARVEST";
  targetId: Id<Source>;
};

type Task = Build | Harvest;
