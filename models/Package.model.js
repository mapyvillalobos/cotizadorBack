const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
  {
    packageName: {
      type: String,
      require: true,
      unique: true,
    },
    packageShortDescription: {
      type: String,
    },
    packageCost: {
      type: String,
      require: true,
    },
    packageAmountPeople: {
      type: String,
      require: true,
    },
    _Product: {
      type: Schema.Types.ObjectId,
      ref: "Catalogue",
      require: true,
    },
    ImageURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dvgmi864m/image/upload/v1661615756/image_xnse2m.png",
    },
  },
  {
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;
