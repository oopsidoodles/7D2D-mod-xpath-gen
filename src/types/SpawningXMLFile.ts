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

type EntitySpawner = Object;

type Spawning = {
  biome: Array<Biome>;
  entityspawner: Array<EntitySpawner>;
};

export type SpawningXMLFile = {
  spawning: Spawning;
};
