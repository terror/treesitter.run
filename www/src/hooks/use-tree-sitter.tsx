import { highlightQueryPath, languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { Parser, Query, Language as TSLanguage } from 'web-tree-sitter';

interface UseTreeSitter {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
  query: Query | null | undefined;
  loading: boolean;
  error: string | undefined;
}

export function useTreeSitter(languageName: Language): UseTreeSitter {
  const [error, setError] = useState<string | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(false);
  const [parser, setParser] = useState<Parser | undefined>(undefined);

  const [loadedLanguages, setLoadedLanguages] = useState<
    Partial<Record<Language, TSLanguage>>
  >({});

  const [loadedQueries, setLoadedQueries] = useState<
    Partial<Record<Language, Query | null>>
  >({});
  const loadedQueriesRef = useRef<Partial<Record<Language, Query | null>>>({});

  useEffect(() => {
    let canceled = false;
    let parserInstance: Parser | undefined;

    const initialize = async () => {
      try {
        setInitializing(true);

        await Parser.init({
          locateFile(scriptName: string) {
            return scriptName;
          },
        });

        parserInstance = new Parser();

        if (!canceled) {
          setParser(parserInstance);
        } else {
          parserInstance.delete();
          parserInstance = undefined;
        }
      } catch (err) {
        if (!canceled) {
          setError(
            `Failed to initialize parser: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      } finally {
        if (!canceled) {
          setInitializing(false);
        }
      }
    };

    initialize();

    return () => {
      canceled = true;

      if (parserInstance) {
        parserInstance.delete();
      }
    };
  }, []);

  useEffect(
    () => () => {
      for (const query of Object.values(loadedQueriesRef.current)) {
        query?.delete();
      }
    },
    []
  );

  useEffect(() => {
    if (!parser || loadedLanguages[languageName]) return;

    let canceled = false;

    const loadLanguage = async () => {
      try {
        setLoadingLanguage(true);

        const language = await TSLanguage.load(
          languageConfig[languageName].wasmPath
        );

        if (!canceled) {
          setLoadedLanguages((prev) => ({
            ...prev,
            [languageName]: language,
          }));
        }
      } catch (err) {
        if (!canceled) {
          setError(
            `Failed to load language ${languageName}: ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        }
      } finally {
        if (!canceled) {
          setLoadingLanguage(false);
        }
      }
    };

    loadLanguage();

    return () => {
      canceled = true;
    };
  }, [parser, languageName, loadedLanguages]);

  useEffect(() => {
    const language = loadedLanguages[languageName];

    if (!language || loadedQueries[languageName] !== undefined) return;

    let canceled = false;

    const loadQuery = async () => {
      let query: Query | null = null;

      try {
        const response = await fetch(highlightQueryPath(languageName));

        if (response.ok) {
          const source = await response.text();
          query = source.trim() ? new Query(language, source) : null;
        } else if (response.status !== 404) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.warn(
          `Failed to load highlights query ${languageName}: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        if (canceled) {
          query?.delete();
        } else {
          setLoadedQueries((prev) => {
            const next = {
              ...prev,
              [languageName]: query,
            };

            loadedQueriesRef.current = next;

            return next;
          });
        }
      }
    };

    loadQuery();

    return () => {
      canceled = true;
    };
  }, [languageName, loadedLanguages, loadedQueries]);

  return {
    parser,
    language: loadedLanguages[languageName],
    query: loadedQueries[languageName],
    loading: initializing || loadingLanguage,
    error,
  };
}
