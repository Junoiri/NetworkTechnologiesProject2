import { Tooltip, Typography, Fade } from '@mui/material';
import { LoanType } from '../data/mockLoans';

interface LoanDetailsProps {
  loan: LoanType;
  children: React.ReactElement<any, any>;
}

const LoanDetailsTooltip: React.FC<LoanDetailsProps> = ({ loan, children }) => {
  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit">{`LoanID: ${loan.LoanID}`}</Typography>
          <Typography color="inherit">{`BookID: ${loan.BookID}`}</Typography>
          <Typography color="inherit">{`UserID: ${loan.UserID}`}</Typography>
          <Typography color="inherit">{`LoanDate: ${loan.LoanDate}`}</Typography>
          <Typography color="inherit">{`DueDate: ${loan.DueDate}`}</Typography>
          <Typography color="inherit">{`ReturnDate: ${loan.ReturnDate || 'Not yet returned'}`}</Typography>
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
