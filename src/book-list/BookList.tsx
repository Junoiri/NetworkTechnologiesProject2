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
import { mockBooks } from '../data/mockBooks';
import './BookList.css';
import BookDetailsTooltip from '../book-details-tooltip/BookDetailsTooltip';
import MenuAppBar from '../menu-app-bar/MenuAppBar';

function BookList() {
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
            {mockBooks.map((book) => (
              <BookDetailsTooltip book={book} key={book.BookID}>
                <ListItem button className="book-list-item">
                  <ListItemIcon>
                    <BookIcon className="book-icon" />
                  </ListItemIcon>
                  <ListItemText primary={book.Title} secondary={book.Author} />
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
