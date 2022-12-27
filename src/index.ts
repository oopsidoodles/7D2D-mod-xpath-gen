import ScaleBiomeSpawnGenerator from "./generators/ScaleBiomeSpawnGenerator";
import ScaleGamestageSpawnGenerator from "./generators/ScaleGamestageSpawnGenerator";

// const gen = new ScaleBiomeSpawnGenerator(
//   "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config",
//   "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\spawning.xml",
//   "oopsidoodles",
//   5
// );
const gen = new ScaleGamestageSpawnGenerator(
  "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config",
  "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\gamestages.xml",
  "oopsidoodles",
  5
);
gen.run();
