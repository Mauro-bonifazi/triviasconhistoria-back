require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// 🔧 Usar variable de entorno
const mongodb = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 Conectado a MongoDB Atlas"))
  .catch((error) => console.error("🔴 Error al conectar a MongoDB:", error));
//mportar Rutas
const triviaRoutes = require("./routes/triviaRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

//Definir Rutas
app.use("/api", triviaRoutes);
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

//Agregar Sawagger
(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

// Configuración Swagger
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API de Trivias con  Historia",
      version: "1.0.0",
      description: "API para una aplicación de trivias sobre historia",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mauro Bonifazi",
        url: "",
        email: "maurobonifazi@hotmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"], // Rutas con anotaciones
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Escucha del servidor
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
