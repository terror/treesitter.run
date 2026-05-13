import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Parser, Language as TSLanguage } from 'web-tree-sitter';

interface UseTreeSitter {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
  loading: boolean;
  error: string | undefined;
}

export function useTreeSitter(languageName: Language): UseTreeSitter {
  const [error, setError] = useState<string | undefined>(undefined);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loadedLanguages, setLoadedLanguages] = useState<
    Partial<Record<Language, TSLanguage>>
  >({});
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(false);
  const [parser, setParser] = useState<Parser | undefined>(undefined);

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

  return {
    parser,
    language: loadedLanguages[languageName],
    loading: initializing || loadingLanguage,
    error,
  };
}
