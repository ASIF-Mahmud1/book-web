import express from "express";
import bookCtrl from "../controllers/book.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/books")
  .get(authCtrl.hasAuthorization, bookCtrl.list) // require signIn
  .post(authCtrl.hasAuthorization, bookCtrl.create); // require signIn

router
  .route("/api/books/:bookId")
  .get(authCtrl.hasAuthorization, bookCtrl.read) // require signIn
  .put(authCtrl.hasAuthorization, bookCtrl.update) // require signIn
  .delete(authCtrl.hasAuthorization, bookCtrl.remove); // require signIn

router.param("bookId", bookCtrl.bookByID);

export default router;
