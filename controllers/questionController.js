const questionRepository = require("../repositories/questionRepository");
const Slugify = require("slugify");

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
const slugify = require("slugify");

const newTrivia = async (req, res) => {
  try {
    const { title, description, image, introduction, questions } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const newQuestion = await questionRepository.createQuestion({
      title,
      slug,
      description,
      image,
      introduction,
      questions,
    });

    res.status(201).json(newQuestion);
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

    res.status(200).json(popular);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener trivias populares",
      error: err.message,
    });
  }
};
//obtener trivia por id
const getTriviaById = async (req, res) => {
  try {
    const { id } = req.params;
    const trivia = await questionRepository.getQuestionById(id);

    if (!trivia) {
      return res.status(404).json({ message: "Trivia no encontrada" });
    }

    res.status(200).json(trivia);
  } catch (err) {
    console.error("Error al obtener trivia por ID:", err.message);
    res.status(500).json({
      message: "Error al obtener la trivia",
      error: err.message,
    });
  }
};
//Obtener trivias por Slug
const getTriviaBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const trivia = await questionRepository.findBySlug(slug);

    if (!trivia) {
      return res.status(404).json({ message: "Trivia no encontrada" });
    }

    res.json(trivia);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener trivia por slug",
      error: error.message,
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
  getTriviaById,
  getTriviaBySlug,
};
