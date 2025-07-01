const express = require("express");
const router = express.Router();
const {
  getQuestions,
  newTrivia,
  updateQuestion,
  deleteQuestion,
  getQuestionsByTitle,
  getPopular,
  getTriviaById,
  getTriviaBySlug,
} = require("../controllers/questionController"); // Importa los controladores
const authMiddleware = require("../middleware/authMiddleware");

router.get("/questions/popular", getPopular);
//Rura para trivias por id
router.get("/questions/:id", getTriviaById);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Obtiene todas las preguntas de trivia
 *     responses:
 *       200:
 *         description: Lista de preguntas de trivia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único de la pregunta
 *                   question:
 *                     type: string
 *                     description: Texto de la pregunta
 *                   options:
 *                     type: array
 *                     description: Opciones de respuesta
 *                     items:
 *                       type: string
 *                   answer:
 *                     type: string
 *                     description: Respuesta correcta
 */
router.get("/questions", getQuestions); // Ruta para obtener preguntas

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Agrega una nueva pregunta de trivia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 */
router.post("/questions", authMiddleware, newTrivia); // Ruta para agregar nuevas trivias
/**@swagger
 * /questions/{id}:
 *   put:
 *     summary: Actualiza una pregunta de trivia
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               answer:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 */
router.put("/questions/:id", authMiddleware, updateQuestion); // Ruta para actualizar preguntas

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Elimina una pregunta de trivia
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta a eliminar
 *     responses:
 *       200:
 *         description: Pregunta eliminada exitosamente
 */
router.delete("/questions/:id", authMiddleware, deleteQuestion); // Ruta para eliminar preguntas

/**
 * @swagger
 * /questions/title/{title}:
 *   get:
 *     summary: Obtiene las preguntas de trivia por título
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la pregunta
 *     responses:
 *       200:
 *         description: Pregunta encontrada exitosamente
 */
router.get("/questions/title/:title", getQuestionsByTitle); // Ruta para obtener preguntas por título
router.get("/slug/:slug", getTriviaBySlug);
module.exports = router; // Exporta el router para usarlo en `app.js`
