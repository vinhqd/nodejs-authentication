module.exports = {
    checkValidate: (req, res, next) => {
        let errs = [];
        if (!req.body.email) {
            errs.push('Email invalidate!!!!'); 
        }
        if (!req.body.password) {
            errs.push('Password invalidate!!!');
        }
        if (errs.length > 0) {
            res.render('pages/login', { errs });
            return;
        }
        next();
    }
}