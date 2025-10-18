export default defineContentScript({
  matches: ['*://www.google.com/*'],
  main() {
    console.log(import.meta.env.MODE)
    console.log('Hello from content entrypoint.');
  },
});
