exports.createTest = async (req, res) => {
  try {
    res.status(200).json({ message: "Test creado exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear test", error: err.message });
  }
};
