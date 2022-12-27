import path from "path";
import parseXML from "./parseXML";
import { ConfigFiles } from "../types/files/ConfigFiles";
import { ConfigFileNameMap } from "../enums/ConfigFileNameMap";

class ConfigFileService {
  constructor(private inputDir: string) {}

  public readConfigFile = <T extends keyof ConfigFiles>(
    name: T
  ): Promise<ConfigFiles[T]> => {
    const fullPath = path.join(this.inputDir, ConfigFileNameMap[name]);
    return parseXML<ConfigFiles[T]>(fullPath);
  };
}

export default ConfigFileService;
