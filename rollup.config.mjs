import { basename } from "node:path";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  external: [], // 不将任何模块视为外部依赖
  watch: {
    // 监听选项
    include: "src/**", // 监听 'src' 目录下的所有文件
    exclude: "node_modules/**", // 排除 'node_modules' 目录
    clearScreen: false, // 防止 Rollup 每次构建时清屏
    buildDelay: 300,
    chokidar: {
      persistent: true, // 保持监听器运行
      ignoreInitial: true, // 忽略初始扫描的文件
    },
  },
  output: [
    {
      dir: "public/core",
      // 慎用选项 - named:适用于使用命名导出的情况
      exports: "named",
      format: "cjs",
      // 入口文件对应的输出文件名
      entryFileNames: (rest) => {
        const fileName = basename(rest.name);
        return fileName + ".js";
      },
      // 使用原始模块名作为文件名
      preserveModules: true,
    },
  ],
  plugins: [
    nodeResolve(), // 使用 node-resolve 插件解析模块
  ],
};
