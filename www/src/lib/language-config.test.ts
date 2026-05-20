import { describe, expect, test } from 'bun:test';
import { Language, Parser, Query } from 'web-tree-sitter';

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

  test('highlight queries compile', async () => {
    await Parser.init({
      locateFile(scriptName: string) {
        return new URL(
          `../../node_modules/web-tree-sitter/${scriptName}`,
          import.meta.url
        ).pathname;
      },
    });

    for (const config of Object.values(languageConfig)) {
      const localPath = new URL(
        `../../../queries/tree-sitter-${config.name}.highlights.scm`,
        import.meta.url
      ).pathname;

      const localFile = Bun.file(localPath);

      const path = (await localFile.exists())
        ? localPath
        : new URL(
            `../../public/tree-sitter-${config.name}.highlights.scm`,
            import.meta.url
          ).pathname;

      const language = await Language.load(
        new URL(`../../public/${config.wasmPath}`, import.meta.url).pathname
      );

      const query = await Bun.file(path).text();
      const highlightQuery = new Query(language, query);

      highlightQuery.delete();
    }
  });

  test('local highlight queries compile', async () => {
    await Parser.init({
      locateFile(scriptName: string) {
        return new URL(
          `../../node_modules/web-tree-sitter/${scriptName}`,
          import.meta.url
        ).pathname;
      },
    });

    for (const config of Object.values(languageConfig)) {
      const path = new URL(
        `../../../queries/tree-sitter-${config.name}.highlights.scm`,
        import.meta.url
      ).pathname;

      const file = Bun.file(path);

      if (!(await file.exists())) {
        continue;
      }

      const language = await Language.load(
        new URL(`../../public/${config.wasmPath}`, import.meta.url).pathname
      );

      const query = await file.text();
      const highlightQuery = new Query(language, query);

      highlightQuery.delete();
    }
  });
});
