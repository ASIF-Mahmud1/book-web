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
    req.book = book;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve the book",
    });
  }
};

const read = (req, res) => {
  return res.json(req.book);
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
    let book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      useFindAndModify: false,
    });
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.status(200).json({ message: "Book information updated", book: book });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res
        .status(200)
        .json({ message: "Book is deleted from the library", book: book });
    }
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
