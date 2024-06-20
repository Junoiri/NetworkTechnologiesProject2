import React from 'react';
import { Tooltip, Typography, Fade } from '@mui/material';
import './LoanDetailsTooltip.css';
import { LoanDto } from '../api/dto/loan.dto';
import { useTranslation } from 'react-i18next';

interface LoanDetailsProps {
  loan: LoanDto;
  children: React.ReactElement<any, any>;
}

const LoanDetailsTooltip: React.FC<LoanDetailsProps> = ({ loan, children }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">
            {t('LoanID')}: {loan.loanId}
          </Typography>
          <Typography color="inherit">
            {t('BookID')}: {loan.bookId}
          </Typography>
          <Typography color="inherit">
            {t('UserID')}: {loan.userId}
          </Typography>
          <Typography color="inherit">
            {t('LoanDate')}: {loan.loanDate}
          </Typography>
          <Typography color="inherit">
            {t('DueDate')}: {loan.dueDate}
          </Typography>
          <Typography color="inherit">
            {t('ReturnDate')}: {loan.returnDate || t('Not yet returned')}
          </Typography>
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
