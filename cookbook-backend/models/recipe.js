const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoURL = process.env.MONGODB_URI;

console.log(`connecting to ${mongoURL}`);

mongoose
  .connect(mongoURL)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB: ", err.message);
  });

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  method: String,
  cookingTime: String
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
