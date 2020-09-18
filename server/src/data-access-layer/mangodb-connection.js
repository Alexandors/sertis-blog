const mongoose = require("mongoose");

const mongo_uri = "mongodb+srv://for-sertis:forsertis1234@mongocluster.qqcwf.mongodb.net/sertis-blog?retryWrites=true&w=majority";

exports.init = () => {
    mongoose.connect(mongo_uri, { useNewUrlParser: true, poolSize: 4 }).then(
        () => {
            console.log("[success] connected to the MangoDB database ");
        },
        error => {
            console.log("[failed] connect to the database MangoDB " + error);
        }
    );

}
