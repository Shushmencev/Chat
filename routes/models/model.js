var mongoose = require('mongoose');
var crypto = require('crypto');


// модель зарегистрированного пользователя
var user_reg = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPwd: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: false
    }
});

user_reg.methods.encryptPwd = function(pwd) {
    return crypto.createHmac('sha1', pwd)
        .update(this.salt)
        .digest('hex');
};

user_reg.virtual('pwd')
    .set(function(pwd) {
        this._plainPassword = pwd;
        this.salt = Math.random() + '';
        this.hashedPwd = this.encryptPwd(pwd);
    })
    .get(function() { return this._plainPassword; });

user_reg.methods.checkPwd = function(pwd) {
    // var a = this.encryptPwd(pwd);
    // var b = this.hashedPwd;
    // console.log(a);
    // console.log(b);

    // return a === b;

    return this.encryptPwd(pwd) === this.hashedPwd;
};

exports.Register = mongoose.model('register', user_reg);


// модель опроса пользователя
var interview = new mongoose.Schema({
    name: String,
    PerDataQuest: {},
    response: {},
    date: {
        type: Date,
        default: Date.now
    }
});

interview.methods.interview_save = function() {
    this.save(function(err) {
        if (err) throw err;

        // сохранение успешно
    });
};

exports.Interview = mongoose.model('interview', interview);