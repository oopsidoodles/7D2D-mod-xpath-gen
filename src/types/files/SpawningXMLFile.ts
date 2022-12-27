export type Spawn = {
  $: {
    maxcount: string;
    respawndelay: string;
    time: string;
    entitygroup: string;
    notags: string;
  };
};

export type Biome = {
  $: { name: string };
  spawn: Array<Spawn>;
};

export type Spawning = {
  biome: Array<Biome>;
  entityspawner: Array<Object>;
};

export type SpawningXMLFile = {
  spawning: Spawning;
};
