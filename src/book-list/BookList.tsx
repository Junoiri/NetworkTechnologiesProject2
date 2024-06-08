import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import './BookList.css';
import BookDetailsTooltip from '../book-details-tooltip/BookDetailsTooltip';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { LibraryClient } from '../api/library-client';
import { BookResponseDto } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';

function BookList() {
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const apiClient = useApi();

  const fetchBooks = async () => {
    try {
      const response = await apiClient.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <MenuAppBar />
      </Grid>
      <Grid item>
        <Box className="book-list-container">
          <List dense className="book-list">
            <Typography variant="h5" component="h1" className="book-list-title">
              Book List
            </Typography>
            {books.map((book) => (
              <BookDetailsTooltip book={book} key={book.bookId}>
                <ListItem button className="book-list-item">
                  <ListItemIcon>
                    <BookIcon className="book-icon" />
                  </ListItemIcon>
                  <ListItemText primary={book.title} secondary={book.author} />
                </ListItem>
              </BookDetailsTooltip>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BookList;
