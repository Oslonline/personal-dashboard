import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const plugins = [react()];
export default defineConfig({
  plugins: plugins
});