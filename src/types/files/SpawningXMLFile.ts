export type Spawn = {
  $: {
    maxcount: string;
    respawndelay: string;
    time: string;
    entitygroup: string;
    tags?: string;
    notags?: string;
  };
};

export type Biome = {
  $: { name: string };
  spawn: Array<Spawn>;
};

export type Property = {
  $: {
    name: string;
    value: string;
  };
};

export type Day = {
  $: { value: string };
  property: Array<Property>;
};

export type EntitySpawner = {
  $: { name: string };
  day: Array<Day>;
};

export type Spawning = {
  biome: Array<Biome>;
  entityspawner: Array<EntitySpawner>;
};

export type SpawningXMLFile = {
  spawning: Spawning;
};
