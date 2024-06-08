export interface LoanType {
  LoanID: string;
  BookID: string;
  UserID: string;
  LoanDate: string;
  DueDate: string;
  ReturnDate: string | null;
}

export const mockLoans: LoanType[] = [
  {
    LoanID: '1',
    BookID: '1',
    UserID: 'User1',
    LoanDate: '2022-01-01',
    DueDate: '2022-01-31',
    ReturnDate: '2022-01-30',
  },
  {
    LoanID: '2',
    BookID: '2',
    UserID: 'User2',
    LoanDate: '2022-02-01',
    DueDate: '2022-02-28',
    ReturnDate: null,
  },
  {
    LoanID: '3',
    BookID: '3',
    UserID: 'User3',
    LoanDate: '2022-03-01',
    DueDate: '2022-03-31',
    ReturnDate: '2022-03-30',
  },
  {
    LoanID: '4',
    BookID: '4',
    UserID: 'User4',
    LoanDate: '2022-04-01',
    DueDate: '2022-04-30',
    ReturnDate: '2022-04-29',
  },
  {
    LoanID: '5',
    BookID: '5',
    UserID: 'User5',
    LoanDate: '2022-05-01',
    DueDate: '2022-05-31',
    ReturnDate: null,
  },
  {
    LoanID: '6',
    BookID: '6',
    UserID: 'User6',
    LoanDate: '2022-06-01',
    DueDate: '2022-06-30',
    ReturnDate: '2022-06-29',
  },
  {
    LoanID: '7',
    BookID: '7',
    UserID: 'User7',
    LoanDate: '2022-07-01',
    DueDate: '2022-07-31',
    ReturnDate: null,
  },
  {
    LoanID: '8',
    BookID: '8',
    UserID: 'User8',
    LoanDate: '2022-08-01',
    DueDate: '2022-08-31',
    ReturnDate: '2022-08-30',
  },
  {
    LoanID: '9',
    BookID: '9',
    UserID: 'User9',
    LoanDate: '2022-09-01',
    DueDate: '2022-09-30',
    ReturnDate: null,
  },
  {
    LoanID: '10',
    BookID: '10',
    UserID: 'User10',
    LoanDate: '2022-10-01',
    DueDate: '2022-10-31',
    ReturnDate: '2022-10-30',
  },
];
