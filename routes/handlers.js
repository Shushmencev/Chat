var model = require('./models/model').Register;
var message = require('./models/model').Message;
var async = require('async');

exports.main = function(req, res, next) {
    // главная  , user: loadUser(req, res, next)
    res.render('main', { title: 'Чат' });
};

exports.send = function(req, res, next) {
    // главная  , user: loadUser(req, res, next)
    console.log(req.body.text);

    var dataMessage = new message({
        user_name: req.session.user,
        text: req.body.text
    });

    dataMessage.message_save();
    res.json(dataMessage);
};

// exports.postSignin = function(req, res) {
//     // обработка данных для входа
//     var email = req.body.email;
//     var pwd = req.body.pwd;

//     async.waterfall([
//         function(callback) {
//             model.findOne({ email: email }, callback);
//         },
//         function(user, callback) {
//             if (user) {
//                 if (user.checkPwd(pwd)) {
//                     // 200 ok
//                     callback(null, user);
//                 } else {
//                     // 403
//                     res.render('signin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
//                 }
//             } else {
//                 // res.json(user);
//                 // ошибка: такого пользователя нет
//                 res.render('signin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
//             }
//         },
//     ], function(err, user) {
//         if (err) next(err);

//         req.session.user = user._id;

//         res.redirect('/');
//     });
// };

// exports.postSignup = function(req, res, next) {
//     // обработка данных для регистрации
//     console.log(req.body);
//     var user = new model({
//         login: req.body.login,
//         pwd: req.body.pwd,
//         email: req.body.email
//     });

//     user.save(function(err, user, next) {
//         if (err) {
//             if (err.name === 'MongoError' && err.code === 11000) {
//                 // ошибка регистрации: user с такими данными уже есть
//                 res.render('signup', {
//                     title: 'Ошибка регистрации',
//                     err: 'Пользователь с такими данными уже зарегистрирован !'
//                 });
//             } else {
//                 // другая ошибка
//                 if (err) throw err;
//             }
//         } else {
//             // регистрация успешна
//             res.render('confim', { title: 'Подтвердите E-mail' });
//         }
//     });
// };

// exports.logout = function(req, res) {
//     // разлогинить
//     if (req.session.user) {
//         delete req.session.user;
//         res.redirect('/');
//     }
// };

// exports.getInterviewFirst = function(req, res) {
//     // страница опросника
//     res.render('queststart', { title: 'Опрос', err: false });
// }

// exports.postInterviewFirst = function(req, res) {
//     // обработка данных пользователя анкеты и начало опроса
//     // запоминать данные в сессии

//     req.session.PerDataQuest = {
//         okato: req.body.okato,
//         age_group_id: req.body.age_group_id,
//         gender: req.body.gender,
//         height_group_id: req.body.height_group_id,
//         weight_group_id: req.body.weight_group_id,
//         smoking: req.body.smoking,
//         id_social_status: req.body.id_social_status,
//     };

//     getQuestions(req, res);
// }

// getQuestions = function(req, res) {
//     // Отправить вопросы
//     interview.findOne({ name: "questions" }, function(err, quest) {
//         if (err) throw err;

//         res.json(quest);
//     });
// }

// exports.responses = function(req, res) {
//     // Ответы на вопросы
//     // req.session.PerDataQuest

//     var dataInterview = new interview({
//         name: "dataInterview",
//         PerDataQuest: req.session.PerDataQuest,
//         response: req.body
//     });

//     dataInterview.interview_save();

//     res.json("ok");
// }

// exports.map = function(req, res) {
//     res.render('map', { title: 'Карта', err: false });
// }

// exports.charts = function(req, res) {
//     res.render('charts', { title: 'Диаграммы', err: false });
// }

// exports.apiCharts = function(res, rec) {
//     console.log(res.body);
// }