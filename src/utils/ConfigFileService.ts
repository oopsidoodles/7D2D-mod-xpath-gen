import path from "path";
import readXML from "./io/readXML";
import writeXML from "./io/writeXML";
import { ConfigFiles } from "../types/files/ConfigFiles";
import { ConfigFileNameMap } from "../enums/ConfigFileNameMap";

class ConfigFileService {
  constructor(private inputDir: string, private outputDir: string) {}

  public readConfigFile = async <T extends keyof ConfigFiles>(
    name: T
  ): Promise<ConfigFiles[T]> => {
    const fullPath = path.join(this.inputDir, ConfigFileNameMap[name]);
    return readXML<ConfigFiles[T]>(fullPath);
  };

  public writeConfigFile = async (
    data: any,
    name: keyof ConfigFiles
  ): Promise<void> => {
    const fullPath = path.join(this.outputDir, ConfigFileNameMap[name]);
    await writeXML(fullPath, data);
  };
}

export default ConfigFileService;
