import React from 'react';
import { Tooltip, Typography, Fade } from '@mui/material';
import './BookDetailsTooltip.css';
import { BookResponseDto } from '../api/dto/book.dto';
import { useTranslation } from 'react-i18next';

interface BookDetailsProps {
  book: BookResponseDto;
  children: React.ReactElement<any, any>;
}

const BookDetailsTooltip: React.FC<BookDetailsProps> = ({ book, children }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">{`${t('Title')}: ${book.title}`}</Typography>
          <Typography color="inherit">{`${t('Author')}: ${book.author}`}</Typography>
          <Typography color="inherit">{`${t('ISBN')}: ${book.isbn}`}</Typography>
          <Typography color="inherit">{`${t('Publisher')}: ${book.publisher}`}</Typography>
          <Typography color="inherit">{`${t('Year Published')}: ${book.year}`}</Typography>
          <Typography color="inherit">{`${t('Available Copies')}: ${book.availableCopies}`}</Typography>
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
