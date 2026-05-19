import { TreeSitterContext } from '@/contexts/tree-sitter-context';
import { highlightQueryPath, languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Parser, Query, Language as TSLanguage } from 'web-tree-sitter';

export const TreeSitterProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [parser, setParser] = useState<Parser | undefined>(undefined);

  const [loadingLanguages, setLoadingLanguages] = useState<Set<Language>>(
    () => new Set()
  );

  const [loadedLanguages, setLoadedLanguages] = useState<
    Partial<Record<Language, TSLanguage>>
  >({});

  const [loadedQueries, setLoadedQueries] = useState<
    Partial<Record<Language, Query | null>>
  >({});

  const loadedLanguagesRef = useRef(loadedLanguages);
  const loadedQueriesRef = useRef(loadedQueries);

  const pendingLanguages = useRef<
    Partial<Record<Language, Promise<TSLanguage>>>
  >({});

  const pendingQueries = useRef<Partial<Record<Language, Promise<void>>>>({});

  useEffect(() => {
    loadedLanguagesRef.current = loadedLanguages;
  }, [loadedLanguages]);

  useEffect(() => {
    loadedQueriesRef.current = loadedQueries;
  }, [loadedQueries]);

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

      for (const query of Object.values(loadedQueriesRef.current)) {
        query?.delete();
      }
    };
  }, []);

  const loadLanguage = useCallback(
    async (languageName: Language) => {
      if (
        !parser ||
        loadedLanguagesRef.current[languageName] ||
        pendingLanguages.current[languageName]
      ) {
        return;
      }

      const promise = TSLanguage.load(languageConfig[languageName].wasmPath);

      pendingLanguages.current[languageName] = promise;

      setLoadingLanguages((previous) => {
        const loadingLanguages = new Set(previous);
        loadingLanguages.add(languageName);
        return loadingLanguages;
      });

      try {
        const language = await promise;

        setLoadedLanguages((previous) => {
          const loadedLanguages = {
            ...previous,
            [languageName]: language,
          };

          loadedLanguagesRef.current = loadedLanguages;

          return loadedLanguages;
        });
      } catch (err) {
        setError(
          `Failed to load language ${languageName}: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        delete pendingLanguages.current[languageName];

        setLoadingLanguages((previous) => {
          const loadingLanguages = new Set(previous);
          loadingLanguages.delete(languageName);
          return loadingLanguages;
        });
      }
    },
    [parser]
  );

  const loadQuery = useCallback(async (languageName: Language) => {
    const language = loadedLanguagesRef.current[languageName];

    if (
      !language ||
      loadedQueriesRef.current[languageName] !== undefined ||
      pendingQueries.current[languageName]
    ) {
      return;
    }

    const promise = (async () => {
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
        delete pendingQueries.current[languageName];

        setLoadedQueries((previous) => {
          const loadedQueries = {
            ...previous,
            [languageName]: query,
          };

          loadedQueriesRef.current = loadedQueries;

          return loadedQueries;
        });
      }
    })();

    pendingQueries.current[languageName] = promise;

    await promise;
  }, []);

  return (
    <TreeSitterContext.Provider
      value={{
        parser,
        loadedLanguages,
        loadedQueries,
        loadingLanguages,
        initializing,
        error,
        loadLanguage,
        loadQuery,
      }}
    >
      {children}
    </TreeSitterContext.Provider>
  );
};
