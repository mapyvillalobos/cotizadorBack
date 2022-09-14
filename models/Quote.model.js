const { Schema, model } = require("mongoose");

const quoteSchema = new Schema(
  {
    clientName: {
      type: String,
      require: true,
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
    date:{
      type: String,
      require: true,
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
    status: {
      type: String,
      enum: ["Cotizado", "Cancelado", "Adelanto", "Pagado", "Confirmado"],
      default: "Cotizado",
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
    _products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Catalogue",
          require: true,
        },
        quantity: Number,
        totalCost: Number,
      },
    ],
    subtotal: Number,
    totalOrder: Number,
    IVA: Number,
  },
  {
    timestamps: true,
  }
);

const Quote = model("Quote", quoteSchema);

module.exports = Quote;
