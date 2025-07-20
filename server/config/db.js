const mongoose = require("mongoose");

const connectDb = async () => {
try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("MongoDb connection failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;