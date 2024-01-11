import { Request, Response } from 'express';
import prisma from '../prisma';


class BookController {
    static AllBooks(req: Request, res: Response): void {
        prisma.books
            .findMany()
            .then(async (books) => {
                // Send Response
                res.status(200).json({
                    status: res.statusCode,
                    message: "OK",
                    data: books
                });
            })
            .catch((error) => {
                res.status(500).json({
                    status: res.statusCode,
                    message: "Internal Server Error",
                    error: error.message
                });
            });
    };

    static BookByIsbn(req: Request, res: Response) {
        function isNumber(value: any): boolean {
            return /^\d+$/.test(value);
        }

        const { isbn } = req.params;

        if (!isbn) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Fill your ISBN !"
            });
        }

        if (!isNumber(isbn)) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Please insert correct ISBN !"
            });
        }

        prisma.books
            .findUnique({
                where: {
                    isbn: Number(isbn)
                },
                include: {
                    reviews: {
                        select: {
                            review: true,
                            stars: true,
                            User: {
                                select: {
                                    full_name: true
                                }
                            }
                        }
                    }
                }
            })
            .then((bookByIsbn) => {
                if (bookByIsbn) {
                    res.status(200).json({
                        status: res.statusCode,
                        message: "OK",
                        data: bookByIsbn
                    });
                } else {
                    res.status(400).json({
                        status: res.statusCode,
                        message: `Book with ISBN ${isbn} Not Found !`
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    status: res.statusCode,
                    message: "Internal Server Error",
                    error: error.message
                });
            });
    };

    static async BookByTitle(req: Request, res: Response): Promise<void> {
        // Getting Title from param
        const { title } = req.params;

        // Check if Title is empty
        if (!title) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your Title !"
            });
        }

        // Getting book by Title from database
        const bookByTitle = await prisma.books.findMany({
            where: {
                Title: {
                    contains: title,
                },
            },
        });

        // Check if data exist
        if (bookByTitle) {
            // Send Response
            res.status(200).json({
                status: res.statusCode,
                message: "OK",
                data: bookByTitle
            });
        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: `Book with Title ${bookByTitle} Not Found !`
            });
        }
    };

    static async BookByAuthor(req: Request, res: Response): Promise<void> {
        // Getting Title from param
        const { author } = req.params;

        // Check if Author is empty
        if (!author) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your Author !"
            });
        }

        // Getting book by Author from database
        const bookByAuthor = await prisma.books.findMany({
            where: {
                Author: {
                    contains: author,
                },
            },
        });

        // Check if data exist
        if (bookByAuthor) {
            // Send Response
            res.status(200).json({
                status: res.statusCode,
                message: "OK",
                data: bookByAuthor
            });
        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: `Book with Author ${bookByAuthor} Not Found !`
            });
        }
    };

    static async BookById(req: Request, res: Response): Promise<void> {
        // Function for checking IsNumber
        function isNumber(value: any): boolean {
            return /^\d+$/.test(value);
        }

        // Getting ID from param
        const { id } = req.params;

        // Check if Id is empty
        if (!id) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your ID !"
            });
        }

        // Check If Id is Number
        if (isNumber(id)) {
            // Getting book by ID from database
            const bookById = await prisma.books.findUnique({
                where: {
                    id: Number(id)
                }
            });

            // Check if data exist
            if (bookById) {
                // Send Response
                res.status(200).json({
                    status: res.statusCode,
                    message: "OK",
                    data: bookById
                });
            } else {
                // Send Response
                res.status(400).json({
                    status: res.statusCode,
                    message: `Book with ID ${id} Not Found !`
                });
            }
        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Please insert correct ID !"
            });
        }
    };

    static async BookReviewById(req: Request, res: Response): Promise<void> {
        // Function for checking IsNumber
        function isNumber(value: any): boolean {
            return /^\d+$/.test(value);
        }

        // Getting ID from param
        const { id } = req.params;

        // Check if Id is empty
        if (!id) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your ID !"
            });
        }

        // Check If Id is Number
        if (isNumber(id)) {
            // Getting book by ID from database
            const bookById = await prisma.books.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    reviews: {
                        select: {
                            review: true,
                            stars: true,
                            User: {
                                select: {
                                    full_name: true
                                }
                            }
                        }
                    }
                }
            });

            // Check if data exist
            if (bookById) {
                // Send Response
                res.status(200).json({
                    status: res.statusCode,
                    message: "OK",
                    data: bookById
                });
            } else {
                // Send Response
                res.status(400).json({
                    status: res.statusCode,
                    message: `Book with ID ${id} Not Found !`
                });
            }
        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Please insert correct ID !"
            });
        }
    };

    static async CreateReview(req: Request, res: Response): Promise<void> {
        // Function for checking IsNumber
        function isNumber(value: any): boolean {
            return /^\d+$/.test(value);
        }

        // Getting Data from body
        const { bookId, userId, review, stars } = req.body;

        // Check if Data is empty
        if (!bookId && !userId && !review && !stars) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your All Data to review a Book !"
            });
        }

        // Check If BookId and UserId is Number
        if (isNumber(bookId) && isNumber(userId) && isNumber(stars)) {
            // Getting Book by Id from database
            const bookById = await prisma.books.findUnique({
                where: {
                    id: Number(bookId)
                }
            });

            // Check if Book exist
            if (bookById) {
                // Getting User by Id from database
                const userByUserId = await prisma.users.findUnique({
                    where: {
                        id: Number(userId)
                    }
                });

                // Check if User exist
                if (userByUserId) {
                    try {
                        // Create New Review
                        const newReview = await prisma.review.create({
                            data: { userId, bookId, review, stars },
                        });

                        // Send Response
                        res.status(200).json({
                            status: res.statusCode,
                            message: "OK",
                            data: newReview
                        });
                    } catch (error) {
                        // Send Response
                        res.status(503).json({
                            status: res.statusCode,
                            message: "Failed to adding review",
                            error: error
                        });
                    }
                } else {
                    // Send Response
                    res.status(400).json({
                        status: res.statusCode,
                        message: `User with ID ${userId} Not Found !`
                    });
                }
            } else {
                // Send Response
                res.status(400).json({
                    status: res.statusCode,
                    message: `Book with ID ${bookId} Not Found !`
                });
            }
        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Please insert correct BookId and UserId !"
            });
        }
    };

    static async DeleteReviewByParticularUser(req: Request, res: Response): Promise<void> {
        // Function for checking IsNumber
        function isNumber(value: any): boolean {
            return /^\d+$/.test(value);
        }

        // Getting Data from body
        const { bookId, userId } = req.params;

        // Check if Data is empty
        if (!bookId && !userId) {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Fill your All Data to delete review a Book !"
            });
        }

        // Check If BookId and UserId is Number
        if (isNumber(bookId) && isNumber(userId)) {
            try {
                const { userId, bookId } = req.params;

                // Pastikan userId dan bookId yang diterima sesuai dengan yang diinginkan
                const review = await prisma.review.findMany({
                    where: {
                        userId: Number(userId),
                        bookId: Number(bookId)
                    },
                });

                if (!review) {
                    res.status(404).json({ error: 'Review not found' });
                    return;
                }


                try {
                    const deletedReview = await prisma.review.delete({
                        where: {
                            userId_bookId: {
                                userId: Number(userId),
                                bookId: Number(bookId)
                            }
                        },

                    });

                    // Send Response
                    res.status(200).json({
                        status: res.statusCode,
                        message: "Succesfully delete a review !"
                    });
                } catch (error) {
                    // Send Response
                    res.status(404).json({
                        status: res.statusCode,
                        message: "Review not found !"
                    });
                }
            } catch (error) {
                // Send Response
                res.status(500).json({ error: 'Internal Server Error' });
            }

        } else {
            // Send Response
            res.status(400).json({
                status: res.statusCode,
                message: "Please insert correct BookId and UserId !"
            });
        }
    };
}



export default BookController;
