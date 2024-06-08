import React from 'react';
import { Tooltip, Typography, Fade } from '@mui/material';
import './LoanDetailsTooltip.css';
import { LoanDto } from '../api/dto/loan.dto';

interface LoanDetailsProps {
  loan: LoanDto;
  children: React.ReactElement<any, any>;
}

const LoanDetailsTooltip: React.FC<LoanDetailsProps> = ({ loan, children }) => {
  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">{`LoanID: ${loan.loanId}`}</Typography>
          <Typography color="inherit">{`BookID: ${loan.bookId}`}</Typography>
          <Typography color="inherit">{`UserID: ${loan.userId}`}</Typography>
          <Typography color="inherit">{`LoanDate: ${loan.loanDate}`}</Typography>
          <Typography color="inherit">{`DueDate: ${loan.dueDate}`}</Typography>
          <Typography color="inherit">{`ReturnDate: ${loan.returnDate || 'Not yet returned'}`}</Typography>
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

export default LoanDetailsTooltip;
