class HomeController {
  static async home(req, res, next) {
    try {
      res.status(200).json({ message: "Home" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HomeController;
