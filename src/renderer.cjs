document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('test').addEventListener('click', () => {
    window.myAPI.test();
  });
});