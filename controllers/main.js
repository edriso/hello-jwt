const login = async (req, res) => {
  res.send("Fake Login/Signup Route");
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 101);

  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your number is ${randomNumber}`,
  });
};

module.exports = { login, dashboard };
