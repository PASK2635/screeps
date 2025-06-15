type Upkeep = {
  name: "UPKEEP";
  targetId: Id<AnyStructure>;
  assignedTo?: Id<Creep>;
};

type Harvest = {
  name: "HARVEST";
  targetId: Id<Source>;
  assignedTo?: Id<Creep>;
};

type Upgrade = {
  name: "UPGRADE";
  targetId: Id<AnyStructure>;
  assignedTo?: Id<Creep>;
};

type Build = {
  name: "BUILD";
  targetId: Id<ConstructionSite>;
  assignedTo?: Id<Creep>;
};

type Task = Upkeep | Harvest | Upgrade | Build;
