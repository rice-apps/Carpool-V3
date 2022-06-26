import { Book } from "./models/Book";

export const resolvers = {
  Query: {
    hello: () => "hi",
    findAllBooks: async () => await Book.find({}),
  },

  Mutation: {
    createBook: async (_, { title, author }) => {
      const newBook = new Book({ title: title, author: author });
      await newBook.save();
      return newBook;
    },
    deleteBook: async (_, { id }) => {
      const newBook = await Book.findByIdAndDelete(id);
      return newBook;
    },
  },
};
