import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBook, TSBook, BooksTable } from "../drizzle/schema";

export const bookService = async (limit?: number): Promise<TSBook[] | null> => {
    if (limit) {
        return await db.query.BooksTable.findMany({
            limit: limit
        });
    }
    return await db.query.BooksTable.findMany();
}

export const getBookService = async (id: number): Promise<TIBook | undefined> => {
    return await db.query.BooksTable.findFirst({
        where: eq(BooksTable.id, id)
    })
}

export const createBookService = async (book: TIBook) => {
    const result=await db.insert(BooksTable).values(book)
    .returning({id:BooksTable.id,title:BooksTable.title,author:BooksTable.author,year:BooksTable.year})
    .execute();
    if(result){
        const insertedBook=result[0];
        return insertedBook;
    }else{
        throw new Error("Error inserting book");
    }
}

export const updateBookService = async (id: number, book: TIBook) => {
    await db.update(BooksTable).set(book).where(eq(BooksTable.id, id))
    return "books updated successfully";
}

export const deleteBookService = async (id: number) => {
    await db.delete(BooksTable).where(eq(BooksTable.id, id))
    return "books deleted successfully";
}