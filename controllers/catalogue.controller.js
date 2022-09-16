const Catalogue = require("../models/Catalogue.model");
const { clearRes } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createCatalogue = async (req, res, next) => {
  const { ...restCatalogue } = req.body;
  try {
    const catalogue = await Catalogue.create({ ...restCatalogue });
    const newCatalogue = clearRes(catalogue.toObject());
    res.status(201).json({ catalogue: newCatalogue });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al crear nuevo producto o servicio" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateCatalogue = async (req, res, next) => {
  const { id } = req.params;
  try {
    const catalogue = await Catalogue.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    const newCatalogue = clearRes(catalogue.toObject());
    res.status(201).json({ catalogue: newCatalogue });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar producto o servicio" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getAllCatalogues = async (req, res, next) => {
  try {
    const catalogues = await Catalogue.find({}, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    })
    res.status(201).json({ catalogues });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al encontrar productos o servicios" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.deleteCatalogue = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Catalogue.findByIdAndRemove(id);
    res.status(201).json({ successMessage: "Producto o servicio Eliminado" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al eliminar producto o servicio" });

    return res.status(500).json({ errorMessage: error.message });
  }
};