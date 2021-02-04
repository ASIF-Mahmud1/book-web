import Book from "../models/book.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";

const create = async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    return res.status(200).json({
      message: "Book added successfully to the library",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Load user and append to req.
 */
const bookByID = async (req, res, next, id) => {
  try {
    let book = await Book.findById(id);
    if (!book)
      return res.status("400").json({
        error: "book not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve the book",
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const list = async (req, res) => {
  try {
    let books = await Book.find();
    res.json(books);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  bookByID,
  read,
  list,
  remove,
  update,
};
