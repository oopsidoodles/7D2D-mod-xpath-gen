import ScaleBiomeSpawnGenerator from "./generators/ScaleBiomeSpawnGenerator";
import ScaleGamestageSpawnGenerator from "./generators/ScaleGamestageSpawnGenerator";
import GeneratorManager from "./generators/GeneratorManager";

const manager = new GeneratorManager(
  "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config",
  "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen",
  "oopsidoodles"
);

// const gen = new ScaleGamestageSpawnGenerator(
//   "D:\\Program Files (x86)\\Steam\\steamapps\\common\\7 Days To Die\\Data\\Config",
//   "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\gamestages.xml",
//   "oopsidoodles",
//   5
// );

manager.addGenerator(new ScaleBiomeSpawnGenerator(5));
// manager.addGenerator(new ScaleBiomeSpawnGenerator(10));
manager.addGenerator(new ScaleGamestageSpawnGenerator(5));

manager.run();
