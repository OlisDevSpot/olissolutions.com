export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log(import.meta.env.MODE)
    console.log('Hello from content entrypoint.');
  },
});
