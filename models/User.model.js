const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true, //[true, "Este correo ya pertenece a unusuario"]
      match: [/^\S+@\S+\.\S+$/, "Ingresa un correo válido"],
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    firstName: {
      type: String,
      minlength: 1,
      require: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      require: true,
    },
    imageURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dvgmi864m/image/upload/v1661615898/profile_m9gd78.png",
    },
    //   _entities:[
    //   {
    //   type: Schema.Types.ObjectId,
    //   ref: "Entity",
    //   require: true,
    // }
  //],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
