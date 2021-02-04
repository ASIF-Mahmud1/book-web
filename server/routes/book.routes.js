import express from "express";
import bookCtrl from "../controllers/book.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/books").get(bookCtrl.list).post(bookCtrl.create);

// router
//   .route("/api/users/:userId")
//   .get(authCtrl.requireSignin, userCtrl.read)
//   .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
//   .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

//router.param("bookId", bookCtrl.bookByID);

export default router;
