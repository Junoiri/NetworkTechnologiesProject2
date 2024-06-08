import React from 'react';
import { Tooltip, Typography, Fade } from '@mui/material';
import './BookDetailsTooltip.css';
import { BookResponseDto } from '../api/dto/book.dto';

interface BookDetailsProps {
  book: BookResponseDto;
  children: React.ReactElement<any, any>;
}

const BookDetailsTooltip: React.FC<BookDetailsProps> = ({ book, children }) => {
  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">{`Title: ${book.title}`}</Typography>
          <Typography color="inherit">{`Author: ${book.author}`}</Typography>
          <Typography color="inherit">{`ISBN: ${book.isbn}`}</Typography>
          <Typography color="inherit">{`Publisher: ${book.publisher}`}</Typography>
          <Typography color="inherit">{`Year Published: ${book.year}`}</Typography>
          <Typography color="inherit">{`Available Copies: ${book.availableCopies}`}</Typography>
        </>
      }
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      enterTouchDelay={0}
    >
      {children}
    </Tooltip>
  );
};

export default BookDetailsTooltip;
