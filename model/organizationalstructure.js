var mongoose = require("mongoose");

var departmentSchema = new mongoose.Schema({
        "department":Object
});

var department = mongoose.model("departments",departmentSchema);

module.exports = department;