const { Schema, model } = require("mongoose");

const catalogueSchema = new Schema(
  {
    productName: {
      type: String,
      require: true,
      unique: true,
    },
    productShortDescription: {
      type: String,
    },
    productCost: {
      type: String,
      require: true,
    },
    catalogueImageURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dvgmi864m/image/upload/v1661615756/image_xnse2m.png",
    },
  },
  {
    timestamps: true,
  }
);

const Catalogue = model("Catalogue", catalogueSchema);

module.exports = Catalogue;
