import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import './LoanForm.css';
import { useApi } from '../api/ApiProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { Typography } from '@mui/material';
import { LoanDto } from '../api/dto/loan.dto';
import NewLoanDialogTooltip from '../new-loan-dialog-tooltip/NewLoanDialogTooltip';
import { useTranslation } from 'react-i18next';

const LoanForm = () => {
  const { t } = useTranslation();
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [availableCopies, setAvailableCopies] = useState<number | undefined>(
    undefined,
  );
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [bookTitles, setBookTitles] = useState<string[]>([]);

  const navigate = useNavigate();
  const libraryClient = useApi();
  const backIcon = require('../assets/ic-back.png');

  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookIdMap, setBookIdMap] = useState<{ [key: string]: string }>({});
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [userName, setUserName] = useState<string | null>(null);
  const currentDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(currentDate.getDate() + 14); // Set the return date to two weeks from now

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await libraryClient.getAllBooks();
        if (response.data) {
          const titles = response.data.map(
            (book: any) => `${book.title}, ${book.author}`,
          );
          const idMap = response.data.reduce(
            (map: { [key: string]: string }, book: any) => {
              map[`${book.title}, ${book.author}`] = book.bookId;
              return map;
            },
            {},
          );
          setBookTitles(titles);
          setBookIdMap(idMap);
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [libraryClient]);

  useEffect(() => {
    if (dropdownValue) {
      console.log(`Dropdown value: ${dropdownValue}`); // Debugging line
      console.log(`Book ID Map: `, bookIdMap); // Debugging line

      const selectedBook = books.find(
        (book) => `${book.title}, ${book.author}` === dropdownValue,
      );
      setSelectedBook(selectedBook);
      setSelectedBookId(bookIdMap[dropdownValue]);
    }
  }, [dropdownValue, books, bookIdMap]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await libraryClient.getUserId();
        console.log('getUserId response:', response);
        if (
          response.success &&
          response.data !== null &&
          response.data !== undefined
        ) {
          const userId = response.data;
          if (typeof userId === 'number') {
            const userResponse = await libraryClient.getUserById(userId);
            if (userResponse.success && userResponse.data) {
              setUserName(userResponse.data.name || null);
              console.log('User name:', userResponse.data.name);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [libraryClient]);

  const handleShowDetails = () => {
    setTooltipOpen(true);
  };

  const handleClose = () => {
    setTooltipOpen(false);
  };

  const handleSave = async () => {
    if (selectedBookId) {
      try {
        const userResponse = await libraryClient.getUserId();
        console.log('User response:', userResponse.data);

        if (userResponse.success && userResponse.data !== null) {
          const userId = userResponse.data as number;

          if (userId !== undefined) {
            const loan: LoanDto = {
              loanId: Math.floor(Math.random() * 10000),
              bookId: parseInt(selectedBookId),
              userId: userId,
              loanDate: currentDate.toISOString(),
              dueDate: returnDate.toISOString(),
              returnDate: '',
            };

            console.log('Saving loan:', loan);

            const response = await libraryClient.addLoan(loan);
            console.log('Save loan response:', response);

            if (response.success) {
              toast.success('Loan saved successfully!');
              navigate('/loans');
            } else {
              toast.error('Failed to save loan. Please try again.');
            }
          } else {
            console.log('User ID:', userId);
            toast.error('User ID is undefined. Please try again.');
          }
        } else {
          toast.error('Failed to get user ID. Please try again.');
        }
      } catch (error) {
        console.error('Error saving loan:', error);
        toast.error(
          'An error occurred while saving the loan. Please try again.',
        );
      }
    } else {
      toast.error('Please select a book.');
    }
  };

  return (
    <>
      <MenuAppBar />
      <ToastContainer />
      <IconButton
        edge="start"
        color="inherit"
        aria-label={t('back')}
        onClick={() => navigate('/loans')}
        className="back-button"
      >
        <img src={backIcon} alt={t('Back')} />
      </IconButton>
      <Container style={{ marginTop: '10px', padding: '0 50px' }}>
        <Grid container spacing={4} direction="row" justifyContent="center">
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                {t('Please select a book from the list below:')}
              </Typography>
              <Autocomplete
                options={bookTitles}
                value={dropdownValue}
                onChange={(event, newValue) => {
                  setDropdownValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dropdown"
                    fullWidth
                    style={{ marginBottom: '20px' }}
                  />
                )}
                style={{ width: '100%' }}
              />
              {selectedBook && (
                <Button
                  onClick={handleShowDetails}
                  style={{ marginTop: '20px' }}
                >
                  Show Details
                </Button>
              )}
              <NewLoanDialogTooltip
                book={selectedBook}
                open={tooltipOpen}
                handleClose={handleClose}
              />
            </Box>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {t('Reader')}: {userName}
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {t('Loan date')}: {currentDate.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {t('Due date')}: {returnDate.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginTop: '150px' }}
        >
          <Button onClick={handleSave} style={{ width: '50%' }}>
            {t('Save Loan')}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LoanForm;
