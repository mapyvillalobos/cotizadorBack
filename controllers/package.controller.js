const Package = require("../models/Package.model")
const { clearRes } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createPackage = async (req, res, next) => {
  const { ...restPackage } = req.body;
  try {
    const package = await Package.create({ ...restPackage });
    const newPackage = clearRes(package.toObject());
    res.status(201).json({ entity: newPackage });
  } catch (error) {
    console.log(error)
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al crear nuevo paquete" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updatePackage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const package = await Package.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    const newPackage = clearRes(package.toObject());
    res.status(201).json({ entity: newPackage });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar paquete" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find(null, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }).populate("_products");
    res.status(201).json({ packages });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al encontrar paquetes" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
