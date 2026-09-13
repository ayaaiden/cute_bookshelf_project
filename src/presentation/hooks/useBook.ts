import { useState, useEffect } from 'react';
import type { Book, ReadingStatus } from '../../core/entities/Book';
import { LocalStorageRepository } from '../../infrastructure/repositories/LocalStorageRepository';

const bookRepository = new LocalStorageRepository();

export function useBooks(){
    const[books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        const allBooks = bookRepository.getAllBooks();
        setBooks(allBooks);
    };

    const addBook = (title: string, author:string, status:ReadingStatus) => {
        bookRepository.addBook({title, author, status, comment: []});
        loadBooks();
    }
    const updateBook = (id: string, title:string, author:string, status:ReadingStatus) => {
        bookRepository.updateBook(id, {title, author, status});
        loadBooks();
    }
    const deleteBook = (id:string) => {
        bookRepository.deleteBook(id);
        loadBooks();
    }
    const addComment = (id:string, comment:string) => {
        const bookToUpdate = bookRepository.getAllBooks().find((book) => book.id === id);
        if(!bookToUpdate || !comment.trim()) return;

        const updatedComments = [...bookToUpdate.comment, comment.trim()];
        bookRepository.updateBook(id, {comment: updatedComments});
        loadBooks();
    }
    return {
        books,
        addBook,
        updateBook,
        addComment,
        deleteBook
    };
}