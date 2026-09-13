import type { Book } from '../../core/entities/Book';
import type { BookRepository } from '../../core/ports/IBookRepository';

export class LocalStorageRepository implements BookRepository{
    private STORAGE_KEY = 'bookshelf_app_books';

    //getting the books from the browser
    getAllBooks(): Book[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if(!data) return [];
        try{
            return JSON.parse(data);
        }catch(error){
            console.log('Failed to parse books from the Local Storage', error);
            return [];
        }
    }

    //add a new book 
    addBook(bookData: Omit<Book, 'id'>): Book {
        const books = this.getAllBooks();

        const newBook: Book = {
            ...bookData, 
            comment: [],
            id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        };
        books.push(newBook);
        this.saveToStorage(books);
        return newBook;
    }

    //update an existing book
    updateBook(id: string, updatedFields: Partial<Book>): Book {
    const books = this.getAllBooks();
    let updatedBook: Book | null = null;

    const newBooks = books.map((book) => {
      if (book.id === id) {
        // Merge old book data with the new updated fields
        updatedBook = { ...book, ...updatedFields };
        return updatedBook;
      }
      return book;
    });

    if (!updatedBook) {
      throw new Error(`Book with id ${id} not found.`);
    }

    this.saveToStorage(newBooks);
    return updatedBook;
  }
  // 4. Delete a book
  deleteBook(id: string): void {
    const books = this.getAllBooks();
    const filteredBooks = books.filter((book) => book.id !== id);
    this.saveToStorage(filteredBooks);
  }
  
  // Helper method to save arrays back to localStorage (since localStorage only saves strings)
  private saveToStorage(books: Book[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
  }
}