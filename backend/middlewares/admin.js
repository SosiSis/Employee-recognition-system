const jwt = require("jsonwebtoken");

function admin(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, "ashewa");
    console.log(decoded);
    if (decoded.position != "Admin") {
      console.log(decoded);
      return res.status(401).send("Unauthorized|");
    } else {
      next();
    }
  } catch (ex) {
   
    res.status(400).send("INVALID Token");
  }
}

module.exports = admin;
