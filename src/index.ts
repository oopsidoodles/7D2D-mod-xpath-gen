import ScaleBiomeSpawnGenerator from "./generators/ScaleBiomeSpawnGenerator";
import ScaleGamestageSpawnGenerator from "./generators/ScaleGamestageSpawnGenerator";
import ScaleLegacySpawnGenerator from "./generators/ScaleLegacySpawnGenerator";
import GeneratorManager from "./generators/GeneratorManager";

// obviously this can come from argv or otherwise
const SCALE = 5;

// TODO proper error handling & usage message if args missing
const [, , originalConfigDir, outputDir, namespace] = process.argv;

// could also have a config json to provide preset defaults for args
const main = async (): Promise<void> => {
  const manager = new GeneratorManager(originalConfigDir, outputDir, namespace);

  manager.addGenerator(new ScaleBiomeSpawnGenerator(SCALE));
  manager.addGenerator(new ScaleLegacySpawnGenerator(SCALE));
  manager.addGenerator(new ScaleGamestageSpawnGenerator(SCALE));

  await manager.run();
};

main();
