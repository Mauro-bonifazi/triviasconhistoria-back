const Question = require("../models/Question");

//Obtener todas las preguntas
const getAllQuestions = async () => {
  return await Question.find();
};
//Obtener pregunta por id
const getQuestionById = async (id) => {
  return await Question.findById(id);
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

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTitle,
};
