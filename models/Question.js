const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default: "",
      required: false,
    },
    introduction: { type: String, required: true },

    // --- LÍNEA A AÑADIR ---
    visit_count: { type: Number, default: 0 },
    // --- FIN DE LA LÍNEA A AÑADIR ---

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
        },
      },
    ],
  },
  { collection: "TriviasconHistoria" }
);

module.exports = mongoose.model("Question", QuestionSchema);
