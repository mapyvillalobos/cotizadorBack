const { Schema, model } = require("mongoose");

const quoteSchema = new Schema(
  {
    clientName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      match: [/^\S+@\S+\.\S+$/, "Ingresa un correo válido"],
      trim: true,
    },
    quoteAmountPeople: {
      type: String,
      require: true,
    },
    eventDate: {
      type: Date,
    },
    clientRFC: {
      type: String,
    },
    clientTaxRegime: {
      type: String,
    },
    clientZipCode: {
      type: Number,
    },
    clientPhone: {
      type: Number,
      require: true,
    },
    _Entity: {
      type: Schema.Types.ObjectId,
      ref: "Entity",
      require: true,
    },
    _Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quote = model("Quote", quoteSchema);

module.exports = Quote;
