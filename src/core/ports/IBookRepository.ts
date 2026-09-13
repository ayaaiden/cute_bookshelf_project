// core logic to know how to sace or delete books, without caring where they are saved. 
import type { Book } from '../entities/Book';
export interface BookRepository{
    // Get all the Books 
    getAllBooks(): Book []
    //Add a new Book
    addBook(book: Omit<Book, 'id'>): Book;
    //Update an existing book 
    updateBook(id: string, updatedFields: Partial<Book>): Book;
    //Delete a Book by the ID
    deleteBook(id:string): void;
}
