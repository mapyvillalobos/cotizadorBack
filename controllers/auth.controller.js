const User = require("../models/User.model");
const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");
const { clearRes, createJWT } = require("../utils/utils");
const { use } = require("../routes/auth.routes");

exports.signupProcess = (req, res, next) => {

  const { role, email, password, ...restUser } = req.body;
  if (!email.length || !password.length)
    return res
      .status(400)
      .json({ errorMessage: "Llena todos los campos obligatorios" });

  // if (password != confirmPassword)
  //   return res
  //     .status(400)
  //     .json({ errorMessage: "Las contraseñas deben coincidir" });

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password))
    return res
      .status(400)
      .json({
        errorMessage:
          "La contraseña debe tener 8 caracteres y al menos una minúscula, una mayúscula y un número",
      });

  //Validar si el email existe antes
  User.findOne({ email })
    .then((found) => {
      if (found)
        return res.status(400).json({ errorMessage: "Ese usuario ya existe" });

      return (
        bcryptjs
          .genSalt(10)
          .then((salt) => bcryptjs.hash(password, salt))
          .then((hashedPassword) => {
            //creamos al nuevo usuario
            return User.create({
              email,
              password: hashedPassword,
              ...restUser,
            });
          })
          .then((user) => {
            const [header, payload, signature] = createJWT(user);
            res.cookie("headload", `${header}.${payload}`, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
              sameSite: "strict",
              secure: false,
            });

            res.cookie("signature", signature, {
              maxAge: 1000 * 60 * 30,
              httpOnly: true,
              sameSite: "strict",
              secure: false,
            });

            const newUser = clearRes(user.toObject());
            res.status(201).json({ user: newUser });
          })
      );
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Este correo ya está resgistrado",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.loginProcess = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.length || !password.length)
    return res
      .status(400)
      .json({ errorMessage: "Llena todos los campos obligatorios" });

  //validar el password > 8 o colocar el regex

  User.findOne({ email })
    .then((user) => {
      //ver si correo existe
      if (!user)
        return res
          .status(400)
          .json({ errorMessage: "Correo y/o contraseña inválidas" });

      //ver si la contraseña es correcta
      return bcryptjs.compare(password, user.password).then((match) => {
        if (!match)
          return res
            .status(400)
            .json({ errorMessage: "Correo y/o contraseña inválidas" });

        //crear nuestro jwt
        const [header, payload, signature] = createJWT(user);

        res.cookie("headload", `${header}.${payload}`, {
          maxAge: 1000 * 60 * 30, //24 horas
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });

        res.cookie("signature", signature, {
          maxAge: 1000 * 60 * 30, //24 horas
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });
        //vamos a limpiar el response del usuario
        const newUser = clearRes(user.toObject());
        res.status(200).json({ user: newUser });
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Este correo ya está resgistrado",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.logoutProcess = (req, res, next) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res
    .status(200)
    .json({
      successMessage: "Sesión cerró correctamente. Te esperamos pronto!",
    });
};
