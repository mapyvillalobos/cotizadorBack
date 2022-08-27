const { Schema, model } = require("mongoose");

const entitySchema = new Schema(
  {
    entityName: {
      type: String,
      require: true,
      unique: true,
    },
    entityImageURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dvgmi864m/image/upload/v1661615756/image_xnse2m.png",
    },
  },
  {
    timestamps: true,
  }
);

const Entity = model("Entity", entitySchema);

module.exports = Entity;
