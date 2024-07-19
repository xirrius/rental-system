const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email, password: user.password },
    "RentalSystem",
    {
      expiresIn: "1h",
    }
  );
  return token;
}; 

const verifyToken = (token) => {
  token = token.toString().substr(6)
  const decoded = jwt.verify(token, "RentalSystem");
  return decoded;
};

module.exports = { generateToken, verifyToken };
