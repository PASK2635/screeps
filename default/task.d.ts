type Upkeep = {
  name: "UPKEEP";
  targetId: Id<AnyStructure>;
};

type Harvest = {
  name: "HARVEST";
  targetId: Id<Source>;
};

type Upgrade = {
  name: "UPGRADE";
  targetId: Id<AnyStructure>;
};

type Build = {
  name: "BUILD";
  targetId: Id<ConstructionSite>;
};

type Task = Upkeep | Harvest | Upgrade | Build;
