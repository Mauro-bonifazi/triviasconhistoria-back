require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔧 Variables de entorno
const mongodb = process.env.MONGO_URI;

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.triviasconhistoria.com.ar",
  "https://triviasconhistoria.com.ar", // Ponemos ambas por seguridad (con y sin www)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

// --- MODIFICACIÓN PARA MONGODB (SERVERLESS) ---
let isConnected = false;
app.use(async (req, res, next) => {
  const mongodb = process.env.MONGO_URI; // <--- La movimos acá adentro

  if (!isConnected && mongodb) {
    // Validamos que exista la URI
    try {
      await mongoose.connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("🟢 Conectado a MongoDB Atlas");
    } catch (error) {
      console.error("🔴 Error al conectar a MongoDB:", error);
    }
  }
  next();
});
// Importar Rutas
const triviaRoutes = require("./routes/triviaRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Definir Rutas
app.use("/api", triviaRoutes);
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

// Ruta de bienvenida para verificar el despliegue
app.get("/", (req, res) => {
  res.send("Backend de Trivias con Historia funcionando en Vercel 🚀");
});

// --- CONFIGURACIÓN SWAGGER ---
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API de Trivias con Historia",
      version: "1.0.0",
      description: "API para una aplicación de trivias sobre historia",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mauro Bonifazi",
        email: "maurobonifazi@hotmail.com",
      },
    },
    servers: [
      {
        url: "https://triviasconhistoria-back.vercel.app", // Podrás cambiar esto por tu URL de Vercel luego
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// --- ESCUCHA DEL SERVIDOR (SOLO LOCAL) ---
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

// --- EXPORTAR PARA VERCEL ---
module.exports = app;
