module.exports = {
    getPage: (req, res) => {
        res.render('pages/login', { errs: [] });
    },
    post: (req, res) => {
        res.redirect('/');
    }
}