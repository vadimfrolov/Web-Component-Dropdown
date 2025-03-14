import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import * as sass from 'sass';

export default {
  input: 'src/custom-dropdown.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      outDir: 'dist',
      declaration: false, 
      declarationMap: false,
      composite: false
    }),
    scss({
      processor: css => css,
      sass: sass,
      output: false,
      outputStyle: 'compressed'
    })
  ],
  preserveEntrySignatures: false
};
