import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // vitest에서 제공하는 api를 별도의 import 없이 사용할 수 있다.
    environment: 'jsdom', // jsdom 환경에서 구동하도록 설정
    setupFiles: './src/utils/test/setupTests.js', // 테스트 실행 전에 실행할 파일을 설정
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
