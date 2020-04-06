function home(req, res) {
  res.render('home', {
    title: 'home',
  });
}

module.exports = {
  home,
};
