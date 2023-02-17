const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const randomNumber = Math.floor(Math.random() * 101);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your random number is ${randomNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
