export type BookDto = {
  title: string | undefined;
  author: string | undefined;
  isbn: string | undefined;
};

export type BookResponseDto = {
  bookId: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  year: number | undefined;
  availableCopies: number | undefined;
};
