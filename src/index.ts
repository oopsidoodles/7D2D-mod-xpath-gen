import ScaleBiomeSpawnGenerator from "./generators/ScaleBiomeSpawnGenerator";
import ScaleGamestageSpawnGenerator from "./generators/ScaleGamestageSpawnGenerator";
import ScaleLegacySpawnGenerator from "./generators/ScaleLegacySpawnGenerator";
import GeneratorManager from "./generators/GeneratorManager";
// import readXML from "./utils/io/readXML";
// import fs from "fs";

const main = async (): Promise<void> => {
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
  manager.addGenerator(new ScaleLegacySpawnGenerator(5));
  manager.addGenerator(new ScaleGamestageSpawnGenerator(5));

  await manager.run();

  // const str = await readXML(
  //   "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\spawning.xml"
  // )
  //   .then((res) => res.oopsidoodles.set.map((set) => set.$.xpath))
  //   .then((arr) => arr.join("\n"));
  // await fs.promises.writeFile(
  //   "D:\\Users\\Vili\\Desktop\\7d2d_mod_xpath_gen\\temp.log",
  //   str
  // );
};

main();
