var model = require('./models/model').Register;

module.exports = function(req, res, next) {
    if (!req.session.user) {
        res.locals.user = null;
        return next();
    }

    model.findById(req.session.user, function(err, user) {
        if (err) return next(err);

        res.locals.user = user;
        next();
    });
};