import express from "express";
import bookCtrl from "../controllers/book.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/books/test").get(bookCtrl.test);

router.route("/api/books").get(bookCtrl.list).post(bookCtrl.create);

router.route("/api/books/:bookId").get(bookCtrl.read); // require signIn

router.param("bookId", bookCtrl.bookByID);

export default router;
