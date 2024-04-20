import React from "react";
import { Tooltip, Typography, Fade } from "@mui/material";
import "./BookDetailsTooltip.css";

interface BookDetailsProps {
  book: {
    BookID: string;
    ISBN: string;
    Publisher: string;
    YearPublished: number;
    AvailableCopies: number;
  };
  children: React.ReactElement<any, any>;
}

const BookDetailsTooltip: React.FC<BookDetailsProps> = ({ book, children }) => {
  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">{`BookID: ${book.BookID}`}</Typography>
          <Typography color="inherit">{`ISBN: ${book.ISBN}`}</Typography>
          <Typography color="inherit">{`Publisher: ${book.Publisher}`}</Typography>
          <Typography color="inherit">{`Year Published: ${book.YearPublished}`}</Typography>
          <Typography color="inherit">{`Available Copies: ${book.AvailableCopies}`}</Typography>
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
