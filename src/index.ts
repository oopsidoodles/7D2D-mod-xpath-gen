import ScaleBiomeSpawnGenerator from "./generators/ScaleBiomeSpawnGenerator";

const gen = new ScaleBiomeSpawnGenerator(
  "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config",
  "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\spawning.xml",
  "oopsidoodles",
  5
);
// const gen = new BiomeSpawningGenerator(
//   "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Mods\\JaxTeller718-BiggerWanderingHordes\\Config\\gamestages.xml",
//   ""
// );
gen.run();
