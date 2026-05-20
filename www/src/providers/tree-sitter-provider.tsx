import {
  type LoadedTreeSitterLanguage,
  TreeSitterContext,
} from '@/contexts/tree-sitter-context';
import { languageConfig } from '@/lib/language-config';
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
    Partial<Record<Language, LoadedTreeSitterLanguage>>
  >({});

  const loadedLanguagesRef = useRef(loadedLanguages);

  const pendingLanguages = useRef<
    Partial<Record<Language, Promise<LoadedTreeSitterLanguage>>>
  >({});

  useEffect(() => {
    loadedLanguagesRef.current = loadedLanguages;
  }, [loadedLanguages]);

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
      } catch (error) {
        if (!canceled) {
          setError(
            `Failed to initialize parser: ${error instanceof Error ? error.message : String(error)}`
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

      for (const loadedLanguage of Object.values(loadedLanguagesRef.current)) {
        loadedLanguage?.query?.delete();
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

      const promise = (async (): Promise<LoadedTreeSitterLanguage> => {
        const config = languageConfig[languageName];

        const language = await TSLanguage.load(config.wasmPath);

        let query: Query | null = null;

        if (config.highlightQueryPath) {
          try {
            const response = await fetch(config.highlightQueryPath);

            if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }

            const source = await response.text();

            query = source.trim() ? new Query(language, source) : null;
          } catch (error) {
            console.warn(
              `Failed to load highlights query ${languageName}: ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        }

        return { language, query };
      })();

      pendingLanguages.current[languageName] = promise;

      setLoadingLanguages((previous) => {
        const loadingLanguages = new Set(previous);
        loadingLanguages.add(languageName);
        return loadingLanguages;
      });

      try {
        const loadedLanguage = await promise;

        setLoadedLanguages((previous) => {
          const loadedLanguages = {
            ...previous,
            [languageName]: loadedLanguage,
          };

          loadedLanguagesRef.current = loadedLanguages;

          return loadedLanguages;
        });
      } catch (error) {
        setError(
          `Failed to load language ${languageName}: ${
            error instanceof Error ? error.message : String(error)
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

  return (
    <TreeSitterContext.Provider
      value={{
        parser,
        loadedLanguages,
        loadingLanguages,
        initializing,
        error,
        loadLanguage,
      }}
    >
      {children}
    </TreeSitterContext.Provider>
  );
};
