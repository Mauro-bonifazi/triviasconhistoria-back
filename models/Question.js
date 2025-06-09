const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default: "",
      required: false,
    }, // URL de la imagen del tema
    introduction: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
        category: { type: String, required: false },
        image: {
          type: String,
          default: "",
          required: false,
        }, //Url de la imagen de cada pregunta
      },
    ],
  },
  { collection: "TriviasconHistoria" }
);

module.exports = mongoose.model("Question", QuestionSchema);
