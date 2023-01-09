/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // required
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false
  }
})
