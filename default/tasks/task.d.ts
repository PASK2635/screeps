type Upkeep = {
  name: "UPKEEP";
  targetId: Id<AnyStructure>;
};

type Harvest = {
  name: "HARVEST";
  targetId: Id<Source>;
};

type Task = Upkeep | Harvest;
