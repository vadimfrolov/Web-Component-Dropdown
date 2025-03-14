import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/custom-dropdown.ts',
  output: {
    file: 'dist/custom-dropdown.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript(),
    resolve(),
    scss({
      processor: () => require('sass'),
      outputStyle: 'compressed'
    }),
    terser()
  ]
};
