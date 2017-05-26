var express = require('express'),
    router = require('./routes/router'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    mongostore = require('connect-mongo/es5')(session),
    conf = require('config'),
    mongoose = require('mongoose'),
    app = express();


// Configuration
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
mongoose.connect(conf.get('mongoose.url'));
app.use(session({
    secret: conf.mongoose.options.secret,
    key: conf.mongoose.options.key,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: null
    },
    store: new mongostore({
        url: conf.get('mongoose.url'),
    })
}));

app.use(express.static(__dirname + '/media'));

app.use(require('./routes/loadUser'));

app.use(function(err, req, res, next) {
    if ('development' == app.get('env')) {
        var error = errorHandler();
        error(err, req, res, next);
    } else {
        res.send(500);
    }

});

app.use('/', router);

app.listen(conf.get('port'), function() {
    console.log("Сервер запущен:");
});

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket){
    socket.on('message', function (text, cb){
        socket.broadcast.emit('message', text);
        cb(text);
    })
});