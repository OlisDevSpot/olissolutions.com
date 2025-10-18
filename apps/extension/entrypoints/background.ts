
export default defineBackground({
  main() {
    console.log('Hello backgroundddd!', { id: browser.runtime.id });
  },
});
