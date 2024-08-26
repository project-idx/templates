/** @type {import('vite').UserConfig} */
export default {
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
}