import jwt from "jsonwebtoken";

const verifyJwtToken = (req, res, next) => {
  const token = req.header("x-access-token");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      req.user = {
        id: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      };

      next();
    }
  } catch (e) {
    return res.status(401).send("Unauthorized!");
  }
};

export default verifyJwtToken;
