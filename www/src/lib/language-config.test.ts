import { describe, expect, test } from 'bun:test';
import { Language, Parser } from 'web-tree-sitter';

import { languageConfig } from './language-config';

describe('languageConfig', () => {
  test('configured highlight queries exist', async () => {
    for (const config of Object.values(languageConfig)) {
      if (!config.highlightQueryPath) {
        continue;
      }

      const path = new URL(
        `../../public/${config.highlightQueryPath}`,
        import.meta.url
      ).pathname;

      expect(await Bun.file(path).exists(), config.name).toBe(true);
    }
  });

  test('sample code parses without errors', async () => {
    await Parser.init({
      locateFile(scriptName: string) {
        return new URL(
          `../../node_modules/web-tree-sitter/${scriptName}`,
          import.meta.url
        ).pathname;
      },
    });

    const parser = new Parser();

    for (const config of Object.values(languageConfig)) {
      const language = await Language.load(
        new URL(`../../public/${config.wasmPath}`, import.meta.url).pathname
      );

      parser.setLanguage(language);

      const tree = parser.parse(config.sampleCode);

      expect(tree?.rootNode.hasError, config.name).toBe(false);
    }
  });
});
