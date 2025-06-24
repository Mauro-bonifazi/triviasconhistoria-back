const questionRepository = require("../repositories/questionRepository");

// Obtener todas las preguntas
const getQuestions = async (req, res) => {
  try {
    const questions = await questionRepository.getAllQuestions(); // Usar repositorio
    res.status(200).json(questions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener preguntas", error: err.message });
  }
};
//Obter pregunta por titulo
const getQuestionsByTitle = async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title); // Decodificar título si es necesario
    const questions = await questionRepository.getQuestionsByTitle(title);
    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron preguntas con ese título" });
    }
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error al obtener preguntas por título:", err.message);
    res.status(500).json({
      message: "Error al obtener preguntas por título",
      error: err.message,
    });
  }
};

// Agregar una nueva trivia
const newTrivia = async (req, res) => {
  console.log("Body recibido:", req.body);
  try {
    const { title, description, image, introduction, questions } = req.body;
    const newQuestion = await questionRepository.createQuestion({
      title,
      description,
      image,
      introduction,
      questions,
    });
    res.status(201).json(newQuestion);
    console.log("REQ BODY:", req.body);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al agregar pregunta", error: err.message });
  }
};

// Actualizar una pregunta
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, introduction, questions } = req.body;
    const updatedQuestion = await questionRepository.updateQuestion(id, {
      title,
      description,
      image,
      introduction,
      questions,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    res.status(200).json(updatedQuestion);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar pregunta", error: err.message });
  }
};

// Eliminar una pregunta
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await questionRepository.deleteQuestion(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    res.status(200).json({ message: "Pregunta eliminada exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar pregunta", error: err.message });
  }
};
// 🔥 NUEVA función para trivias populares
const getPopular = async (req, res) => {
  try {
    const popular = await questionRepository.getMostVisitedQuestions(); // <-- usa tu repo
    console.log("📊 Populares desde la DB:", popular);
    res.status(200).json(popular);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener trivias populares",
      error: err.message,
    });
  }
};

module.exports = {
  getQuestions,
  newTrivia,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTitle,
  getPopular,
};
