import { defineConfig } from 'vite';
import lightningcss from 'vite-plugin-lightningcss';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import htmlMinifier from 'vite-plugin-html-minifier-terser';

const isProduction = process.env.NODE_ENV === 'production';
const browsersQuery = isProduction
  ? '>0.2%, not dead, not op_mini all'
  : 'last 1 chrome version, last 1 firefox version, last 1 safari version';
const targets = browserslistToTargets(browserslist(browsersQuery));

export default defineConfig({
  root: './src',
  base: './',
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    lightningcss({
      minify: isProduction,
      targets,
      sourceMap: !isProduction,
    }),
    htmlMinifier({
      minify: isProduction,
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      collapseBooleanAttributes: true,
    }),
  ],
});
