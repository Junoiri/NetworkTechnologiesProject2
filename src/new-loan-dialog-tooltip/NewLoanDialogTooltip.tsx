import React from 'react';
import { Tooltip, Typography, Fade, Button } from '@mui/material';
import { BookResponseDto } from '../api/dto/book.dto';
import { useTranslation } from 'react-i18next';

interface BookDetailsProps {
  book: BookResponseDto | null;
  open: boolean;
  handleClose: () => void;
}

const NewLoanDialogTooltip: React.FC<BookDetailsProps> = ({
  book,
  open,
  handleClose,
}) => {
  const { t } = useTranslation();

  if (!book) {
    return null;
  }

  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">
            {t('Title')}: {book.title}
          </Typography>
          <Typography color="inherit">
            {t('Author')}: {book.author}
          </Typography>
          <Typography color="inherit">
            {t('ISBN')}: {book.isbn}
          </Typography>
          <Typography color="inherit">
            {t('Publisher')}: {book.publisher}
          </Typography>
          <Typography color="inherit">
            {t('Year Published')}: {book.year}
          </Typography>
          <Typography color="inherit">
            {t('Available Copies')}: {book.availableCopies}
          </Typography>
          <Button onClick={handleClose}>{t('Close')}</Button>
        </>
      }
      open={open}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      enterTouchDelay={0}
    >
      <div />
    </Tooltip>
  );
};

export default NewLoanDialogTooltip;
