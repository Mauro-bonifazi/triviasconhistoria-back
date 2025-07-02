const Question = require("../models/Question");

// 1. FUNCIÓN AÑADIDA: Obtener las 3 trivias más visitadas
const getMostVisitedQuestions = async () => {
  // .sort({ visit_count: -1 }) -> Ordena de mayor a menor
  // .limit(3) -> Trae solo 3 resultados
  return await Question.find().sort({ visit_count: -1 }).limit(3);
};

//Obtener todas las preguntas
const getAllQuestions = async () => {
  return await Question.find();
};

// 2. FUNCIÓN MODIFICADA: Obtener pregunta por id e incrementar visita
const getQuestionById = async (id) => {
  // Usamos findByIdAndUpdate para encontrar Y actualizar en un solo paso atómico.
  // $inc: { visit_count: 1 } -> Incrementa el campo visit_count en 1.
  // { new: true } -> Asegura que la función devuelva el documento ya actualizado.
  return await Question.findByIdAndUpdate(
    id,
    { $inc: { visit_count: 1 } },
    { new: true }
  );
};

//Obter pregunta por titulo
const getQuestionsByTitle = async (title) => {
  return await Question.find({ title });
};
//Crear pregunta
const createQuestion = async (data) => {
  const newQuestion = new Question(data);
  return await newQuestion.save();
};
//Actualizar pregunta
const updateQuestion = async (id, data) => {
  return await Question.findByIdAndUpdate(id, data, { new: true });
};
//Eliminar pregunta
const deleteQuestion = async (id) => {
  return await Question.findByIdAndDelete(id);
};
//Trivias por Slug
const findBySlug = async (slug) => {
  return await Question.findOneAndUpdate(
    { slug },
    { $inc: { visit_count: 1 } },
    { new: true }
  );
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTitle,
  getMostVisitedQuestions,
  findBySlug,
};
