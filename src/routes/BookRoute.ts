// userRoute.ts
import express from 'express';
import BookController from '../controller/BookController';

const router = express.Router();

router.get('/books/getallbooks', BookController.AllBooks);
router.get('/books/bookbyisbn/:isbn', BookController.BookByIsbn);
router.get('/books/bookbyid/:id', BookController.BookById);
router.get('/books/bookreviewbyid/:id', BookController.BookReviewById);
router.get('/books/bookbytitle/:title', BookController.BookByTitle);
router.get('/books/bookbyauthor/:author', BookController.BookByAuthor);
router.post('/books/createreview', BookController.CreateReview);
router.delete('/books/deletereview/:userId/:bookId', BookController.DeleteReviewByParticularUser);


export default router;
