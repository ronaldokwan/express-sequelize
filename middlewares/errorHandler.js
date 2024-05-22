async function errHandler(error, req, res, next) {
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const errors = error.errors[0].message;
      res.status(400).json({ message: errors });
      break;
    case "JsonWebTokenError":
    case "Invalid token":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "Name is required":
      res.status(400).json({ message: "Name is required" });
      break;
    case "Age is required":
      res.status(400).json({ message: "Age is required" });
      break;
    case "Email is required":
      res.status(400).json({ message: "Email is required" });
      break;
    case "Password is required":
      res.status(400).json({ message: "Password is required" });
      break;
    case "Title is required":
      res.status(400).json({ message: "Title is required" });
      break;
    case "Invalid email/password":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    case "Email already exist":
      res.status(401).json({ message: "Email already exist" });
      break;
    case "You're not authorized":
      res.status(403).json({ message: "You're not authorized" });
      break;
    case "Note not found":
      res.status(404).json({ message: "Note not found" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
}

module.exports = errHandler;
