export interface LoanDto {
  loanId?: number;
  bookId: number;
  userId?: number;
  loanDate: string;
  dueDate: string;
  returnDate: string;
}
