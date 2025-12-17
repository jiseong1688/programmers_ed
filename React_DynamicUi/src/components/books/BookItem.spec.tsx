import { render, screen } from "@testing-library/react";
import { Book } from "../../models/book.model";
import { BookStoreThemeProvider } from "../../context/themeContext";
import BookItem from "./BookItem";

const dummyBook: Book = {
    id: 1,
    title: "Dummy Book Title",
    img: 5,
    form: "paperback",
    isbn: "Dummy ISBN",
    summary: "Dummy Summary",
    detail: "Dummy Detail",
    author: "Dummy Author",
    pages: 100,
    contents: "Dummy Contents",
    price: 10000,
    likes: 1,
    pubDate: "2025-04-22",
    category_id: 1,
};

describe("BookItem", () => {
  it("렌더 여부", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook}/>
      </BookStoreThemeProvider>
    );

    expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText(dummyBook.likes.toString())).toBeInTheDocument();

    const img = screen.getByRole("img", { name: dummyBook.title });
    expect(img).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});