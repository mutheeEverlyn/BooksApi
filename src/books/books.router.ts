import { Hono } from "hono";
import { listBooks, getBook, createBook, updateBook, deleteBook } from "./books.controller"
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../validators";
export const bookRouter = new Hono();


bookRouter.get("/books", listBooks);
bookRouter.get("/books/:id", getBook) 
bookRouter.post("/books", zValidator('json', bookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createBook)
//update a book
bookRouter.put("/books/:id", updateBook)

bookRouter.delete("/books/:id", deleteBook)

