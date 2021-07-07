import babel from 'rollup-plugin-babel';

import minify from 'rollup-plugin-babel-minify';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
  ],
  external: ['react', 'prop-types'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    minify( {
      sourceMap: false,
      comments: false,
    }),
  ]
};