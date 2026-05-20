import { type Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';
import { type Query, type Tree } from 'web-tree-sitter';

const captureClasses: Record<string, string> = {
  attribute: 'cm-ts-attribute',
  boolean: 'cm-ts-constant',
  character: 'cm-ts-string',
  comment: 'cm-ts-comment',
  conditional: 'cm-ts-keyword',
  constant: 'cm-ts-constant',
  constructor: 'cm-ts-type',
  embedded: 'cm-ts-string',
  escape: 'cm-ts-string',
  function: 'cm-ts-function',
  include: 'cm-ts-keyword',
  keyword: 'cm-ts-keyword',
  label: 'cm-ts-label',
  module: 'cm-ts-module',
  number: 'cm-ts-number',
  operator: 'cm-ts-operator',
  property: 'cm-ts-property',
  punctuation: 'cm-ts-punctuation',
  repeat: 'cm-ts-keyword',
  string: 'cm-ts-string',
  tag: 'cm-ts-tag',
  type: 'cm-ts-type',
  variable: 'cm-ts-variable',
};

const markCache = new Map<string, Decoration>();

interface HighlightRange {
  className: string;
  from: number;
  to: number;
}

export const captureClassName = (captureName: string): string | undefined => {
  const name = captureName.split('.')[0];

  return captureClasses[captureName] ?? captureClasses[name];
};

const highlightMark = (className: string): Decoration => {
  const mark = markCache.get(className);

  if (mark) {
    return mark;
  }

  const next = Decoration.mark({ class: className });

  markCache.set(className, next);

  return next;
};

export const normalizeHighlightRanges = (
  ranges: HighlightRange[]
): HighlightRange[] => {
  const validRanges = ranges.filter(({ from, to }) => from < to);

  if (validRanges.length === 0) {
    return [];
  }

  const offsets = Array.from(
    new Set(validRanges.flatMap(({ from, to }) => [from, to]))
  ).sort((a, b) => a - b);

  const normalized: HighlightRange[] = [];

  for (let i = 0; i < offsets.length - 1; i++) {
    const from = offsets[i];
    const to = offsets[i + 1];

    let range: HighlightRange | undefined;

    for (let j = validRanges.length - 1; j >= 0; j--) {
      const candidate = validRanges[j];

      if (candidate.from <= from && to <= candidate.to) {
        range = candidate;
        break;
      }
    }

    if (!range) {
      continue;
    }

    const previous = normalized.at(-1);

    if (
      previous &&
      previous.to === from &&
      previous.className === range.className
    ) {
      previous.to = to;
    } else {
      normalized.push({ className: range.className, from, to });
    }
  }

  return normalized;
};

export const highlightRanges = ({
  query,
  tree,
}: {
  query: Query | null | undefined;
  tree: Tree | null;
}): HighlightRange[] => {
  if (!query || !tree) {
    return [];
  }

  const ranges = query.captures(tree.rootNode).flatMap((capture) => {
    const className = captureClassName(capture.name);

    if (!className) {
      return [];
    }

    const from = capture.node.startIndex;
    const to = capture.node.endIndex;

    if (to <= from) {
      return [];
    }

    return [{ className, from, to }];
  });

  return normalizeHighlightRanges(ranges);
};

export const syntaxHighlightingExtension = ({
  query,
  tree,
}: {
  query: Query | null | undefined;
  tree: Tree | null;
}): Extension => {
  const ranges = highlightRanges({ query, tree });

  if (ranges.length === 0) {
    return [];
  }

  const decorations = Decoration.set(
    ranges.map(({ className, from, to }) =>
      highlightMark(className).range(from, to)
    )
  );

  return EditorView.decorations.of(() => decorations);
};
