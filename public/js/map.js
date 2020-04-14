const map = document.querySelector('svg');
function getAllPaths() {
  const countries = document.querySelectorAll('path');
  countries.forEach((item) =>
    item.addEventListener('click', function (e) {
      console.log(e.target);
    })
  );
}
getAllPaths();
