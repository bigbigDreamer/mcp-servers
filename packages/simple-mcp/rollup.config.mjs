import { defineConfig } from "rollup";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import { minify } from 'rollup-plugin-esbuild';
import cleaner from 'rollup-plugin-cleaner';
import json from '@rollup/plugin-json';
import { nodeResolve } from "@rollup/plugin-node-resolve";



const extensions = ['.js', '.ts'];

const external = [
    '@modelcontextprotocol/sdk/*',
    'zod'
];


export default defineConfig({
    input: "./src/index.ts",
    output: {
        format: 'esm',
        file: 'dist/bundle.js',
    },
    external,
    plugins: [
        // 帮助 rollup 查找 node_modules 里的三方模块
        resolve({ extensions }),
        // 帮助 rollup 查找 commonjs 规范的模块, 常配合 rollup-plugin-node-resolve 一起使用
        commonjs(),
        json(), nodeResolve(),
        cleaner({
            targets: ['./dist/'],
        }),
        swc({
            exclude: ['.*\\.js$', '.*\\.map$'],
            jsc: {
                loose: true,
                externalHelpers: true,
                parser: {
                    syntax: 'typescript',
                },
                target: 'es2015',
            },
        }),
        // esbuild 压缩代码
        minify(),
    ]
})