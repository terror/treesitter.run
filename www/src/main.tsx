import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import './index.css';
import { EditorSettingsProvider } from './providers/editor-settings-provider.tsx';
import { TreeSitterProvider } from './providers/tree-sitter-provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TreeSitterProvider>
      <EditorSettingsProvider>
        <Toaster richColors />
        <App />
      </EditorSettingsProvider>
    </TreeSitterProvider>
  </React.StrictMode>
);
