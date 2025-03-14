import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
// Update sass import to use recommended format
import * as sass from 'sass';

export default {
  input: 'src/custom-dropdown.ts',
  output: {
    // Change output directory to match TypeScript outDir
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      // Either specify output directory for declarations
      outDir: 'dist',
      // Or disable declaration file generation
      declaration: false, 
      declarationMap: false,
      composite: false
    }),
    scss({
      // Process SCSS files
      processor: css => css,
      // Use dart-sass
      sass: sass,
      // Don't write to a CSS file
      output: false,
      outputStyle: 'compressed'
    })
  ],
  preserveEntrySignatures: false
};
