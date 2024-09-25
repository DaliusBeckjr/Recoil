/* eslint-disable no-import-assign */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import path from 'path';


// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const inputFile = path.resolve(__dirname, 'packages/recoil/Recoil_index.js');
const externalLibs = ['react', 'react-dom'];

const commonPlugins = [
  resolve(),
  commonjs(),
  babel({ babelHelpers: 'bundled' }),
];

const configs = [
  {
    input: inputFile,
    output: {
      file: path.resolve(__dirname, 'cjs/recoil.js'),
      format: 'cjs',
      exports: 'named',
    },
    external: externalLibs,
    plugins: commonPlugins,
  },
  {
    input: inputFile,
    output: {
      file: path.resolve(__dirname, 'es/recoil.js'),
      format: 'es',
      exports: 'named',
    },
    external: externalLibs,
    plugins: commonPlugins,
  },
  {
    input: inputFile,
    output: {
      file: path.resolve(__dirname, 'umd/recoil.js'),
      format: 'umd',
      name: 'Recoil',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    external: externalLibs,
    plugins: [
      ...commonPlugins,
      terser(), // Optional minification for production builds
    ],
  },
];

export default configs;
