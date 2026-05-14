import manifest from '../../../manifest.json';
import type { Language, ParserMetadata } from './types';

interface ManifestParser {
  name: string;
  path?: string;
  repository: string;
  revision: string;
}

export const parserMetadataFromManifest = (manifest: ManifestParser[]) =>
  Object.fromEntries(
    manifest.map(({ name, path, repository, revision }) => [
      name,
      {
        repository,
        revision,
        ...(path ? { sourcePath: path } : {}),
      },
    ])
  );

export const parserMetadata = parserMetadataFromManifest(manifest) as Record<
  Language,
  ParserMetadata
>;

export const commitUrl = ({
  repository,
  revision,
}: Pick<ParserMetadata, 'repository' | 'revision'>) =>
  `${repository}/commit/${revision}`;
