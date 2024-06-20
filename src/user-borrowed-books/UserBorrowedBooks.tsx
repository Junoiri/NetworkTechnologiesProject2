import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useApi } from '../api/ApiProvider';
import { LoanDto } from '../api/dto/loan.dto';
import './UserBorrowedBooks.css';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';

interface UserBorrowedBooksProps {
  userId: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserBorrowedBooks({ userId }: UserBorrowedBooksProps) {
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanDto | null>(null);
  const apiClient = useApi();
  const { t } = useTranslation();

  const fetchLoans = async () => {
    try {
      const response = await apiClient.getLoansForReader();
      if (response.data) {
        setLoans(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [userId]);

  const filteredLoans = loans.filter(
    (loan) =>
      loan.bookId.toString().toLowerCase().includes(search.toLowerCase()) &&
      loan.returnDate === null,
  );
  const handleClickOpen = (loan: LoanDto) => {
    setSelectedLoan(loan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReturnLoan = async () => {
    if (selectedLoan && selectedLoan.loanId !== undefined) {
      const response = await apiClient.returnLoan(selectedLoan.loanId);
      if (response.success) {
        setLoans(loans.filter((l) => l.loanId !== selectedLoan.loanId));
      } else {
        console.error('Failed to return loan:', response.statusCode);
      }
    } else {
      console.error('Loan ID is undefined');
    }
    setOpen(false);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Box className="user-borrowed-books-container">
          <Typography
            variant="h5"
            component="h1"
            className="user-borrowed-books-title"
          >
            {t('User Loans')}
          </Typography>
          <Paper component="form" className="borrowed-books-search-box">
            <IconButton
              aria-label={t('search')}
              className="borrowed-books-btn-search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder={t('Type to Search...')}
              inputProps={{ 'aria-label': t('type to search') }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="borrowed-books-input-search"
            />
          </Paper>
          <div className="loans-list">
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <div key={loan.loanId} className="loan-item">
                  <Typography variant="body1" component="p">
                    {t('Book ID')}: {loan.bookId}, {t('Loan Date')}:{' '}
                    {loan.loanDate}, {t('Due Date')}: {loan.dueDate}
                  </Typography>
                  <Button
                    className="return-button"
                    onClick={() => handleClickOpen(loan)}
                    sx={{
                      background: 'linear-gradient(to right, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '4px 2px',
                      transitionDuration: '0.4s',
                      cursor: 'pointer',
                      '&:hover': {
                        background:
                          'linear-gradient(to right, #764ba2, #667eea)',
                        color: 'white',
                      },
                    }}
                  >
                    {t('Mark as returned')}
                  </Button>
                </div>
              ))
            ) : (
              <Typography variant="body1" component="p">
                {t('No loans for this user.')}
              </Typography>
            )}
          </div>
        </Box>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t('Confirm Return')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('Are you sure you want to mark this loan as returned?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Cancel')}</Button>
          <Button onClick={handleReturnLoan}>{t('Confirm')}</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default UserBorrowedBooks;
