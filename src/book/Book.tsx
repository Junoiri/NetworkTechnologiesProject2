import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './Book.css';
import { useTranslation } from 'react-i18next';

interface BookProps {
  title: string;
  author: string;
}

function Book({ title, author }: BookProps) {
  const { t } = useTranslation();

  return (
    <Card className="book-card" variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${t('by')} ${author}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Book;
