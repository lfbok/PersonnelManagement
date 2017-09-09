var mongoose = require("mongoose");

var monthactivitySchema = new mongoose.Schema({
        "date":String,
        "listData":[
             { type: String, content: String }
        ]
});

var monthactivity = mongoose.model("monthactivitys",monthactivitySchema);

module.exports = monthactivity;