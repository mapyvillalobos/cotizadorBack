const Entity = require("../models/Entity.model");
const { clearRes } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createEntity = async (req, res, next) => {
  const { ...restEntity } = req.body;
  try {
    const entity = await Entity.create({ ...restEntity });
    const newEntity = clearRes(entity.toObject());
    res.status(201).json({ entity: newEntity });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al crear nueva entidad" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateEntity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const entity = await Entity.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    const newEntity = clearRes(entity.toObject());
    res.status(201).json({ entity: newEntity });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar entidad" });

    return res.status(500).json({ errorMessage: error.message });
  }
  };

  exports.getAllEntities = async (req, res, next) => {
    try {
      const entities = await Entity.find(null, {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });
      res.status(201).json({ entities });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        return res.status(400).json({ errorMessage: error.message });

      if (error.code === 11000)
        return res
          .status(400)
          .json({ errorMessage: "Error al encontrar entidades" });

      return res.status(500).json({ errorMessage: error.message });
    }
  };