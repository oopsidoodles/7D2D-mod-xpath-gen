import BiomeSpawningGenerator from "./generators/BiomeSpawningGenerator";

const gen = new BiomeSpawningGenerator(
  "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config\\spawning.xml",
  ""
);
// const gen = new BiomeSpawningGenerator(
//   "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Mods\\JaxTeller718-BiggerWanderingHordes\\Config\\gamestages.xml",
//   ""
// );
gen.run();
