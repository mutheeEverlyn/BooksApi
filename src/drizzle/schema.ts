import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";



export const BooksTable = pgTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    author: varchar("author", { length: 100 }),
    year: integer("year"),
});

export type TIBook = typeof BooksTable.$inferInsert;
export type TSBook = typeof BooksTable.$inferSelect;

