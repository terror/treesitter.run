import type {
  Completion,
  CompletionContext,
  CompletionResult,
  CompletionSource,
} from '@codemirror/autocomplete';

import type { SyntaxNode } from './types';

interface QueryCompletionOptions {
  root: SyntaxNode | undefined;
}

interface QueryCompletionBuckets {
  captures: Completion[];
  fields: Completion[];
  namedNodes: Completion[];
  anonymousNodes: Completion[];
}

const word = /[\w-]*$/;
const capture = /@[\w.-]*$/;
const string = /"[^"\n]*$/;

export const captureNameForNodeType = (nodeType: string): string =>
  nodeType.replace(/[^\w.-]+/g, '_');

export const collectQueryCompletionBuckets = ({
  root,
}: QueryCompletionOptions): QueryCompletionBuckets => {
  const anonymousNodes = new Set<string>();
  const fields = new Set<string>();
  const namedNodes = new Set<string>();

  const walk = (node: SyntaxNode) => {
    if (node.isNamed) {
      namedNodes.add(node.type);
    } else {
      anonymousNodes.add(node.type);
    }

    for (let index = 0; index < node.childCount; index++) {
      const field = node.fieldNameForChild(index);

      if (field) {
        fields.add(field);
      }
    }

    node.children.forEach(walk);
  };

  if (root) {
    walk(root);
  }

  return {
    captures: Array.from(namedNodes)
      .map(captureNameForNodeType)
      .sort()
      .map((name) => ({
        label: `@${name}`,
        type: 'variable',
        detail: 'capture',
      })),
    fields: Array.from(fields)
      .sort()
      .map((field) => ({
        label: `${field}:`,
        type: 'property',
        detail: 'field',
      })),
    namedNodes: Array.from(namedNodes)
      .sort()
      .map((nodeType) => ({
        label: nodeType,
        type: 'type',
        detail: 'node',
      })),
    anonymousNodes: Array.from(anonymousNodes)
      .sort()
      .map((nodeType) => ({
        label: JSON.stringify(nodeType),
        type: 'constant',
        detail: 'anonymous node',
      })),
  };
};

export const collectQueryCompletions = (
  options: QueryCompletionOptions
): Completion[] => {
  const buckets = collectQueryCompletionBuckets(options);

  return [
    ...buckets.namedNodes,
    ...buckets.fields,
    ...buckets.anonymousNodes,
    ...buckets.captures,
  ];
};

export const queryCompletionSource =
  (options: QueryCompletionOptions): CompletionSource =>
  (context: CompletionContext): CompletionResult | null => {
    const buckets = collectQueryCompletionBuckets(options);
    const stringMatch = context.matchBefore(string);

    if (stringMatch) {
      return {
        from: stringMatch.from,
        options: buckets.anonymousNodes,
        validFor: string,
      };
    }

    const captureMatch = context.matchBefore(capture);

    if (captureMatch) {
      return {
        from: captureMatch.from,
        options: buckets.captures,
        validFor: capture,
      };
    }

    const wordMatch = context.matchBefore(word);

    if (!wordMatch || (wordMatch.from === wordMatch.to && !context.explicit)) {
      return null;
    }

    return {
      from: wordMatch.from,
      options: [
        ...buckets.namedNodes,
        ...buckets.fields,
        ...buckets.anonymousNodes,
      ],
      validFor: word,
    };
  };
