let timer;

export default function debounce(fn, delay) {
  // Cancels the setTimeout method execution
  clearTimeout(timer);
  // Executes the func after delay time.
  timer = setTimeout(() => {
    fn.apply(this, arguments);
  }, delay);
}
