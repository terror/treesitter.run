import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { SyntaxNode } from '@/lib/types';

interface NodeInspectorDialogProps {
  node: SyntaxNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

interface Detail {
  label: string;
  value: string | number;
}

const formatPosition = ({ row, column }: { row: number; column: number }) =>
  `${row}:${column}`;

const inspectableText = (text: string) => {
  if (text.length <= 1000) {
    return text;
  }

  return `${text.slice(0, 1000)}...`;
};

const fieldName = (node: SyntaxNode): string => {
  const { parent } = node;

  if (!parent) {
    return 'None';
  }

  for (let index = 0; index < parent.childCount; index++) {
    if (parent.child(index)?.equals(node)) {
      return parent.fieldNameForChild(index) ?? 'None';
    }
  }

  return 'None';
};

const metadataDetails = (node: SyntaxNode): Detail[] => [
  { label: 'Type', value: node.type },
  { label: 'Grammar type', value: node.grammarType },
  { label: 'Field', value: fieldName(node) },
  { label: 'Node id', value: node.id ?? 'None' },
  { label: 'Type id', value: node.typeId },
  { label: 'Grammar id', value: node.grammarId },
  { label: 'Child count', value: node.childCount },
  { label: 'Named child count', value: node.namedChildCount },
  { label: 'Descendant count', value: node.descendantCount },
  { label: 'Parse state', value: node.parseState },
  { label: 'Next parse state', value: node.nextParseState },
];

const rangeDetails = (node: SyntaxNode): Detail[] => [
  { label: 'Start point', value: formatPosition(node.startPosition) },
  { label: 'End point', value: formatPosition(node.endPosition) },
  { label: 'Start byte', value: node.startIndex },
  { label: 'End byte', value: node.endIndex },
];

const DetailGrid = ({ details }: { details: Detail[] }) => (
  <dl className='grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm'>
    {details.map((detail) => (
      <div key={detail.label} className='contents'>
        <dt className='text-muted-foreground text-xs font-medium'>
          {detail.label}
        </dt>
        <dd className='min-w-0 font-mono text-xs break-all'>{detail.value}</dd>
      </div>
    ))}
  </dl>
);

export const NodeInspectorDialog = ({
  node,
  onOpenChange,
  open,
}: NodeInspectorDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      aria-describedby={undefined}
      className='max-h-[min(720px,calc(100vh-2rem))] overflow-auto sm:max-w-[640px]'
    >
      <DialogHeader className='sr-only'>
        <DialogTitle>Inspect node</DialogTitle>
      </DialogHeader>

      <div className='grid gap-5'>
        <section className='grid gap-2'>
          <h3 className='text-sm font-medium'>Metadata</h3>
          <DetailGrid details={metadataDetails(node)} />
        </section>

        <section className='grid gap-2'>
          <h3 className='text-sm font-medium'>Preview</h3>
          <pre className='bg-muted max-h-52 overflow-auto rounded-md border p-3 font-mono text-xs whitespace-pre-wrap'>
            {inspectableText(node.text)}
          </pre>
        </section>

        <section className='grid gap-2'>
          <h3 className='text-sm font-medium'>Range</h3>
          <DetailGrid details={rangeDetails(node)} />
        </section>
      </div>
    </DialogContent>
  </Dialog>
);
