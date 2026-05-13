import path from 'node:path';
import {
  LANGUAGE_VERSION,
  Language,
  MIN_COMPATIBLE_VERSION,
  Parser,
} from 'web-tree-sitter';

const publicDirectory = process.env.TREE_SITTER_PUBLIC_DIR;
const names = process.env.TREE_SITTER_PARSERS.split('\n').filter(Boolean);

await Parser.init({
  locateFile(scriptName) {
    return path.join(publicDirectory, scriptName);
  },
});

const parser = new Parser();

try {
  for (const name of names) {
    const language = await Language.load(
      path.join(publicDirectory, `tree-sitter-${name}.wasm`)
    );

    if (
      language.abiVersion < MIN_COMPATIBLE_VERSION ||
      language.abiVersion > LANGUAGE_VERSION
    ) {
      throw new Error(
        `${name} ABI ${language.abiVersion} is outside ${MIN_COMPATIBLE_VERSION}-${LANGUAGE_VERSION}`
      );
    }

    parser.setLanguage(language);
    parser.parse('foo').delete();

    console.log(`verified ${name} ABI ${language.abiVersion}`);
  }
} finally {
  parser.delete();
}
