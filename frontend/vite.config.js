import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

const iconAliasMap = {
  'XCircle': 'circle-x',
  'HelpCircle': 'circle-help',
  'AlertCircle': 'circle-alert',
  'CheckCircle': 'circle-check',
  'CheckCircle2': 'circle-check-big',
  'CheckSquare': 'check-square-2',
  'BarChart3': 'bar-chart-3',
  'Building2': 'building-2',
  'Edit2': 'edit-2',
  'Edit3': 'edit-3',
  'Maximize2': 'maximize-2',
  'Trash2': 'trash-2',
};

function pascalToKebab(name) {
  if (iconAliasMap[name]) return iconAliasMap[name];
  return name
    .replace(/([a-zA-Z])([0-9]+)/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function lucideIconOptimizerPlugin() {
  return {
    name: 'vite-plugin-lucide-optimizer',
    enforce: 'pre',
    transform(code, id) {
      if ((id.endsWith('.jsx') || id.endsWith('.js') || id.endsWith('.tsx') || id.endsWith('.ts')) && !id.includes('node_modules')) {
        if (code.includes("from 'lucide-react'") || code.includes('from "lucide-react"')) {
          const transformed = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g, (match, importsStr) => {
            const rawImports = importsStr
              .split(',')
              .map(s => s.trim())
              .filter(Boolean);

            const replacements = rawImports.map(item => {
              let iconName = item;
              let localName = item;

              if (item.includes(' as ')) {
                const parts = item.split(/\s+as\s+/);
                iconName = parts[0].trim();
                localName = parts[1].trim();
              }

              const kebab = pascalToKebab(iconName);
              return `import ${localName} from 'lucide-react/dist/esm/icons/${kebab}.mjs';`;
            });

            return replacements.join('\n');
          });
          return { code: transformed, map: null };
        }
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    lucideIconOptimizerPlugin(),
    react(),
    tailwindcss(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    })
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  server: {
    warmup: {
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/layouts/AdminLayout.jsx',
        './src/components/sidebar/AdminSidebar.jsx',
        './src/components/navbar/AdminNavbar.jsx',
      ],
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react/')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
