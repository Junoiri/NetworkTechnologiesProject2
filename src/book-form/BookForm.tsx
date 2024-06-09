import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import './BookForm.css';
import { LibraryClient } from '../api/library-client';
import { useApi } from '../api/ApiProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const BookForm = () => {
  const [isbn, setIsbn] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');
  const [publisher, setPublisher] = useState<string | undefined>('');
  const [year, setYear] = useState<number | undefined>();
  const [availableCopies, setAvailableCopies] = useState<number | undefined>();

  const navigate = useNavigate();
  const libraryClient = useApi();
  const backIcon = require('../assets/ic-back.png');

  const handleSave = async () => {
    const book = {
      isbn: isbn || '',
      title: title || '',
      author: author || '',
      publisher: publisher || '',
      year: year || 0,
      availableCopies: availableCopies || 0,
    };
    const result = await libraryClient.addBook(book);

    if (result.success) {
      toast.success('Book added successfully');
      setTimeout(() => {
        navigate('/books');
      }, 4000);
    } else {
      if (result.statusCode === 409) {
        toast.error('Failed to add book. The book already exists.');
      } else {
        toast.error('Failed to add book');
      }
    }
  };
  return (
    <>
      <MenuAppBar />
      <ToastContainer />
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={() => navigate('/books')}
        className="back-button"
      >
        <img src={backIcon} alt="Back" />
      </IconButton>
      <Container style={{ marginTop: '100px', padding: '0 50px' }}>
        <Grid container spacing={4} direction="row" justifyContent="center">
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <TextField
                label="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <TextField
                label="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Available Copies"
                value={availableCopies}
                onChange={(e) => setAvailableCopies(Number(e.target.value))}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginTop: '20px' }}
        >
          <Button onClick={handleSave} style={{ width: '50%' }}>
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookForm;
