var mongoose = require('mongoose');


// модель - аритмия
var aritmia = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: Number,
    r4: boolean,
    r5: boolean,
    simtomy: boolean
});

exports.Aritmia = mongoose.model('aritmia', aritmia);


// модель - Болезни почек
var kidneys = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: Number,
    r5: Number,
    simtomy: boolean
});

exports.Kidneys = mongoose.model('kidneys', kidneys);


// модель - Болезнь органив дыхания
var breath = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: boolean,
    r5: boolean,
    simtomy: boolean
});

exports.Breath = mongoose.model('breath', breath);


// модель - Болезнь глаз
var eyes = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    simtomy: boolean
});

exports.Eyes = mongoose.model('eyes', eyes);


// модель - артрит
var arthritis = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    simtomy: boolean
});

exports.Arthritis = mongoose.model('arthritis', arthritis);


// модель - гипертензия
var hypertension = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: Number,
    r4: Number,
    simtomy: boolean
});

exports.Hypertension = mongoose.model('hypertension', hypertension);

// модель - сколиоз
var scoliosis = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    simtomy: boolean
});

exports.Scoliosis = mongoose.model('scoliosis', scoliosis);






// модель ростовой группы
var tall_group = new mongoose.Schema({
    _id: Number,
    up_value: Number,
    down_value: Number
});

exports.Tall_group = mongoose.model('tall_group', tall_group);


// модель социального статуса
var social_status = new mongoose.Schema({
    _id: Number,
    name_status: String
});

exports.Social_status = mongoose.model('social_status', social_status);


// модель весовой группы
var weight_group = new mongoose.Schema({
    _id: Number,
    up_value: Number,
    down_value: Number
});

exports.Weight_group = mongoose.model('weight_group', weight_group);

// модель возростной группы
var age_group = new mongoose.Schema({
    _id: Number,
    up_value: Number,
    down_value: Number
});

exports.Age_group = mongoose.model('age_group', age_group);


// модель групп регионов
var okato = new mongoose.Schema({
    _id: Number,
    name_region: String
});

exports.Okato = mongoose.model('okato', okato);