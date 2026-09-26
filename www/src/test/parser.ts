import { afterAll, afterEach, beforeAll } from 'bun:test';
import { Language, Parser, type Tree } from 'web-tree-sitter';

export const createTestParser = () => {
  let parser: Parser;
  const trees: Tree[] = [];

  beforeAll(async () => {
    await Parser.init({
      locateFile: (file: string) =>
        new URL(`../../node_modules/web-tree-sitter/${file}`, import.meta.url)
          .pathname,
    });

    const language = await Language.load(
      new URL('../../public/tree-sitter-javascript.wasm', import.meta.url)
        .pathname
    );

    parser = new Parser();
    parser.setLanguage(language);
  });

  afterEach(() => {
    for (const tree of trees) {
      tree.delete();
    }

    trees.length = 0;
  });

  afterAll(() => parser.delete());

  return (code: string) => {
    const tree = parser.parse(code);

    if (!tree) {
      throw new Error('Parse failed');
    }

    trees.push(tree);

    return tree.rootNode;
  };
};
