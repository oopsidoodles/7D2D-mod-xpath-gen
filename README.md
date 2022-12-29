# 7D2D XPath Mod Gen Tool

Small side project to help with writing 7d2d XPath mods

- reads in configs using `xml2js` lib
- outputs resulting XPath xml's into output directory
- changes are made using a `Generator`
  - `Generator` takes as input the config & outputs the resulting XPath changes
  - `GeneratorManager` will combine changes of multiple generators to output the xml's
- fully typed :tada:

## Dependencies

In brackets is what is confirmed to work

- Node (v19.3.0)
- npm (9.2.0)

## Setup

1. `npm install`

That's it

## Usage

1. `npm run build` after any changes
2. `node ./dist/index.js <7d2d-config-dir> <output-dir> <namespace>` assuming your entrypoint is `index.ts`
   - `7d2d-config-dir` is located in `7d2d-install-location\Data\Config`
   - `output-dir` is self-explanatory
   - `namespace` is the name for the top level root node in the output

## Limitations

- so far only `set` XPath tags are supported
- so far only the following config files are typed
  - `spawning.xml`
  - `gamestages.xml`
