import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    root: './src',
    base: './',

    server: {
      port: 3000,
      host: true,
    },

    css: {
      transformer: 'lightningcss',
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      cssMinify: 'lightningcss',
    },

    plugins: [
      isProd && ViteMinifyPlugin({
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      }),
    ].filter(Boolean),
  };
});