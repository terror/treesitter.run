import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app.tsx';
import './index.css';
import { EditorSettingsProvider } from './providers/editor-settings-provider.tsx';
import { TreeSitterProvider } from './providers/tree-sitter-provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TreeSitterProvider>
      <EditorSettingsProvider>
        <App />
      </EditorSettingsProvider>
    </TreeSitterProvider>
  </React.StrictMode>
);
