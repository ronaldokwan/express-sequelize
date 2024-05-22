const { Note } = require("../models");

class NoteController {
  // authentication
  static async getNote(req, res, next) {
    try {
      const data = await Note.findAll({
        where: { userId: req.user.id },
      });
      if (!data) throw { name: "Note not found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addNote(req, res, next) {
    try {
      const { title, description } = req.body;
      if (!title) throw { name: "Title is required" };

      const userId = req.user.id;
      await Note.create({
        title,
        description,
        userId,
      });

      res.status(201).json({ message: "Note has been added" });
    } catch (error) {
      next(error);
    }
  }

  // authentication + authorization
  static async editDescription(req, res, next) {
    try {
      const noteId = req.params.id;
      const { description } = req.body;

      const note = await Note.findByPk(noteId);
      if (!note) throw { name: "Note not found" };

      note.description = description;
      await note.save();

      res.status(200).json({ message: "Note has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async editNote(req, res, next) {
    try {
      const noteId = req.params.id;
      const { title, description } = req.body;

      const note = await Note.findByPk(noteId);
      if (!note) throw { name: "Note not found" };
      if (!title) throw { name: "Title is required" };

      note.title = title;
      note.description = description;
      await note.save();

      res.status(200).json({ message: "Note has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteNote(req, res, next) {
    try {
      const noteId = req.params.id;

      const data = await Note.findByPk(noteId);
      if (!data) throw { name: "Note not found" };
      await data.destroy();

      res.status(200).json({ message: "Note has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NoteController;
