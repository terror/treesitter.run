import { TreeSitterContext } from '@/contexts/tree-sitter-context';
import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Parser, Language as TSLanguage } from 'web-tree-sitter';

export const TreeSitterProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loadingLanguages, setLoadingLanguages] = useState<Set<Language>>(
    () => new Set()
  );
  const [parser, setParser] = useState<Parser | undefined>(undefined);
  const [loadedLanguages, setLoadedLanguages] = useState<
    Partial<Record<Language, TSLanguage>>
  >({});

  const loadedLanguagesRef = useRef(loadedLanguages);
  const pendingLanguages = useRef<
    Partial<Record<Language, Promise<TSLanguage>>>
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

        setLoadedLanguages((loadedLanguages) => ({
          ...loadedLanguages,
          [languageName]: language,
        }));
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
