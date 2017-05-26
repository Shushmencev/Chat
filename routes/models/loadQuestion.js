var interview = require('./model').Interview;
var fs = require('fs');
var conf = require('config');

module.exports = function() {

    try {
        var Quest = JSON.parse(fs.readFileSync(__dirname + "/" + conf.get('file_questions')));
    } catch (e) {
        console.log(e);
    }

    // console.log(Quest);
    var quest = new interview({
        name: "questions",
        response: Quest
    });

    interview.find({ name: "questions" }, function(err, qu) {
        if (err) throw err;

        if (qu.length == 0) {
            // вопросов вообще нет
            quest.save(function(err) {
                if (err) throw err;

                console.log("Вопросы сохранены !");
            });
        } else {
            // сохранение успешно
            interview.update({ name: "questions" }, { $set: { response: Quest } }, function(err) {
                if (err) throw err;

                console.log("Вопросы обновлены !");
            });
        }
    });
};