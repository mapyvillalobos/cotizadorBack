const Quote = require("../models/Quote.model");
const { clearRes } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createQuote = async (req, res, next) => {
  const { ...restQuote } = req.body;
  try {
    const quote = await Quote.create({ ...restQuote, _Owner:req.user._id });
    const newQuote = clearRes(quote.toObject());
    res.status(201).json({ quote: newQuote });
  } catch (error) {
    console.log (error)
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al crear nueva cotización" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateQuote = async (req, res, next) => {
  const { id } = req.params;
  const {status, _products, ...restQuote} = req.body
  try {
    const quote = await Quote.findByIdAndUpdate(
      id,
      { ...restQuote },
      { new: true }
    );
    const newQuote = clearRes(quote.toObject());
    res.status(201).json({ quote: newQuote });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar cotización" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateStatusQuote = async (req, res, next) => {
  const { id } = req.params;
  const { status, ...restQuote } = req.body;

  try {
    const quote = await Quote.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    const newQuote = clearRes(quote.toObject());
    res.status(201).json({ quote: newQuote });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar status de la cotización" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getAllQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find(
      {},
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    )
      .populate("_Owner")
      .populate("_products");
    res.status(201).json({ quotes });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al encontrar cotizaciones" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.getQuoteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const quote = await Quote.findById(id);
    const newQuote = clearRes(quote.toObject());
    res.status(201).json({ quote: newQuote });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al encontrar cotoización" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.deleteQuote = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Quote.findByIdAndRemove(id);
    res.status(201).json({ successMessage: "Cotización eliminada" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al eliminar cotización" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
