import e from "express";
import * as bookModel from "../models/bookModel.js";
import ValidationError from "../utils/ValidationError.js";

export const fetchAllBooks = async () => {
  const books = await bookModel.fetchAllBooks();
  return books;
};
//identify if the book exist by the name and author
const doesBookExist = async (book) => {
  let existing;
  if (Object.hasOwn(book, "id")) {
    existing = await bookModel.findBookById(book.id);
  } else {
    existing = await bookModel.findBookByNameAndAuthor(book);
  }

  if (existing.length > 0) {
    return true;
  }
  return false;
};

// validate if the book does really exisit or already exist and throws it out to create new book
export const createBook = async (book) => {
  if (!book.name || !book.author) {
    throw new ValidationError(404, "Name and author is required");
  }

  const existing = await doesBookExist(book);

  if (existing) {
    throw new ValidationError(409, "Book already exist!");
  }
  const bookId = await bookModel.insert(book);
  return bookId;
};

//update
export const updateBook = async (book) => {
  if (!book.name || !book.author) {
    throw new ValidationError(404, "Name and author is required");
  }

  const existing = await doesBookExist(book);

  if (existing) {
    throw new ValidationError(409, "Book does not exist!");
  }

  const updatedBook = await bookModel.update(book);
  return updatedBook;
};

//delete
export const deleteBook = async (id) => {
  const existing = await bookModel.findBookById(id);

  if (existing.length === 0) {
    throw new ValidationError(404, "Book does not exist!");
  }
  const deletedBook = await bookModel.remove(id);
  return deletedBook;
};
