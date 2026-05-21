import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink, Info } from 'lucide-react';

interface QueryExample {
  description: string;
  label: string;
  query: string;
}

const examples: QueryExample[] = [
  {
    label: 'Capture a node',
    description:
      'Attach a capture name after a node pattern to highlight every matching node.',
    query: '(function_item) @function',
  },
  {
    label: 'Match a field',
    description:
      'Use field names from the syntax tree to target a specific child instead of any matching descendant.',
    query: '(function_item\n  name: (identifier) @name)',
  },
  {
    label: 'Match an anonymous token',
    description:
      'Quote punctuation and keywords when they appear as anonymous nodes in the tree.',
    query: '(binary_expression\n  operator: "!="\n  right: (null))',
  },
  {
    label: 'Require a missing field',
    description:
      'Prefix a field with ! when the parent should only match if that field is absent.',
    query:
      '(class_declaration\n  name: (identifier) @class\n  !type_parameters)',
  },
  {
    label: 'Use a wildcard',
    description:
      'Use (_) for any named node, or _ for any named or anonymous node.',
    query: '(call_expression\n  arguments: (arguments (_) @argument))',
  },
  {
    label: 'Repeat or make optional',
    description:
      'Add +, *, or ? after a node or group to match one or more, zero or more, or optional siblings.',
    query:
      '(class_declaration\n  (decorator)* @decorator\n  name: (identifier) @name)',
  },
  {
    label: 'Choose alternatives',
    description: 'Use square brackets to match one of several node patterns.',
    query:
      '(call_expression\n  function: [\n    (identifier) @function\n    (member_expression property: (property_identifier) @method)\n  ])',
  },
  {
    label: 'Constrain siblings',
    description:
      'Use . as an anchor for first child, last child, or immediate sibling matches.',
    query: '(dotted_name\n  (identifier) @previous\n  .\n  (identifier) @next)',
  },
  {
    label: 'Filter text',
    description:
      'Use predicates such as #eq?, #match?, and #any-of? to filter captured text.',
    query: '((identifier) @constant\n  (#match? @constant "^[A-Z][A-Z_]+$"))',
  },
];

const docs = [
  {
    href: 'https://tree-sitter.github.io/tree-sitter/using-parsers/queries/1-syntax.html',
    label: 'Syntax',
  },
  {
    href: 'https://tree-sitter.github.io/tree-sitter/using-parsers/queries/2-operators.html',
    label: 'Operators',
  },
  {
    href: 'https://tree-sitter.github.io/tree-sitter/using-parsers/queries/3-predicates-and-directives.html',
    label: 'Predicates',
  },
];

export const QueryInfoDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant='ghost'
        size='icon'
        aria-label='Query help'
        title='Query help'
        className='h-7 w-7 cursor-pointer'
      >
        <Info className='h-4 w-4' />
      </Button>
    </DialogTrigger>

    <DialogContent className='max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-[680px]'>
      <DialogHeader>
        <DialogDescription>
          Tree-sitter queries match syntax-tree shapes with S-expressions.
          Captured nodes are highlighted in the syntax tree and source editor.
        </DialogDescription>
      </DialogHeader>

      <div className='grid gap-3'>
        {examples.map((example) => (
          <div key={example.label} className='grid gap-1'>
            <div className='text-xs font-medium'>{example.label}</div>
            <p className='text-muted-foreground text-xs leading-5'>
              {example.description}
            </p>
            <pre className='bg-muted/40 overflow-auto rounded border p-2 font-mono text-xs'>
              <code>{example.query}</code>
            </pre>
          </div>
        ))}
      </div>

      <div className='grid gap-2 pt-4'>
        <div className='text-muted-foreground text-xs font-medium'>
          Official Tree-sitter docs
        </div>
        <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm'>
          {docs.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target='_blank'
              rel='noreferrer'
              className='inline-flex cursor-pointer items-center gap-1 underline-offset-4 hover:underline'
            >
              {doc.label}
              <ExternalLink className='h-3 w-3' />
            </a>
          ))}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
