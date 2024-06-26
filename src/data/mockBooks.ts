export interface BookType {
  BookID: string;
  ISBN: string;
  Title: string;
  Author: string;
  Publisher: string;
  YearPublished: number;
  AvailableCopies: number;
}

export const mockBooks: BookType[] = [
  {
    BookID: '1',
    ISBN: '978-0451524935',
    Title: '1984',
    Author: 'George Orwell',
    Publisher: 'Signet Classic',
    YearPublished: 1950,
    AvailableCopies: 12,
  },
  {
    BookID: '2',
    ISBN: '978-0061120084',
    Title: 'To Kill a Mockingbird',
    Author: 'Harper Lee',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 2006,
    AvailableCopies: 7,
  },
  {
    BookID: '3',
    ISBN: '978-0451524935',
    Title: 'The Great Gatsby',
    Author: 'F. Scott Fitzgerald',
    Publisher: 'Signet Classic',
    YearPublished: 1925,
    AvailableCopies: 5,
  },
  {
    BookID: '4',
    ISBN: '978-0061120084',
    Title: 'Pride and Prejudice',
    Author: 'Jane Austen',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1813,
    AvailableCopies: 3,
  },
  {
    BookID: '5',
    ISBN: '978-0451524935',
    Title: 'The Catcher in the Rye',
    Author: 'J. D. Salinger',
    Publisher: 'Signet Classic',
    YearPublished: 1951,
    AvailableCopies: 10,
  },
  {
    BookID: '6',
    ISBN: '978-0061120084',
    Title: 'Wuthering Heights',
    Author: 'Emily Bronte',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1847,
    AvailableCopies: 2,
  },
  {
    BookID: '7',
    ISBN: '978-0451524935',
    Title: 'The Grapes of Wrath',
    Author: 'John Steinbeck',
    Publisher: 'Signet Classic',
    YearPublished: 1939,
    AvailableCopies: 8,
  },
  {
    BookID: '8',
    ISBN: '978-0061120084',
    Title: 'Sense and Sensibility',
    Author: 'Jane Austen',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1811,
    AvailableCopies: 6,
  },
  {
    BookID: '9',
    ISBN: '978-0451524935',
    Title: 'The Picture of Dorian Gray',
    Author: 'Oscar Wilde',
    Publisher: 'Signet Classic',
    YearPublished: 1890,
    AvailableCopies: 4,
  },
  {
    BookID: '10',
    ISBN: '978-0061120084',
    Title: 'The Importance of Being Earnest',
    Author: 'Shakespeare',
    Publisher: 'Harper Perennial Modern Classics',
    YearPublished: 1600,
    AvailableCopies: 9,
  },
];
