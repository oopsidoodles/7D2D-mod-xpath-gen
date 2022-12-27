export type Spawn = {
  $: {
    group: string;
    num: string;
    maxAlive: string;
    duration: string;
  };
};

export type Gamestage = {
  $: {
    stage: string;
  };
  spawn: Array<Spawn>;
};

export type Spawner = {
  $: {
    name: string;
  };
  gamestage: Array<Gamestage>;
};

export type Gamestages = {
  config: Array<Object>;
  group: Array<Object>;
  spawner: Array<Spawner>;
};

export type GamestagesXMLFile = {
  gamestages: Gamestages;
};
