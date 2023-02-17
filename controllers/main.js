const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // usually comes form DB
  const imaginaryUserId = new Date().valueOf();

  // *try to keep payload small, better experience for user (faster)
  // **jwtSecret here is just for demo, in production use long, complex, and unguessable string value!
  const token = jwt.sign(
    { imaginaryUserId, username },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 101);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your random number is ${randomNumber}`,
  });
};

module.exports = { login, dashboard };
