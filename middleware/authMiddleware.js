const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; // extrae el token sin "Bearer"
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
