import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { UserResponseDto } from '../api/dto/user.dto';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './UserDetailsTooltip.css';

interface UserDetailsTooltipProps {
  user: UserResponseDto;
  children?: React.ReactNode;
  onViewBorrowedBooks: () => void;
}

function UserDetailsTooltip({
  user,
  onViewBorrowedBooks,
}: UserDetailsTooltipProps) {
  const navigate = useNavigate();
  const [loanCount, setLoanCount] = useState<number | null>(null);
  const api = useApi();
  const { t } = useTranslation(); // Use the hook

  useEffect(() => {
    const fetchLoanCount = async () => {
      if (user.id !== undefined) {
        try {
          const count = await api.getUserLoanCount(user.id);
          setLoanCount(count);
        } catch (error) {
          console.error(t('Failed to fetch loan count:'), error); // Translate the string
        }
      }
    };

    fetchLoanCount();
  }, [user.id, api, t]); // Add t to the dependency array

  const handleViewBorrowedBooks = () => {
    navigate(`/borrowed-books/${user.id}`);
  };

  return (
    <Accordion className="user-details-tooltip">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="accordion-summary"
      >
        <Typography>{user.username}</Typography>
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <Typography>{user.email}</Typography>
        <Typography>
          {t('Number of borrowed books:')}{' '}
          {loanCount !== null ? loanCount : t('not found')}
        </Typography>
        <Button
          onClick={onViewBorrowedBooks}
          color="primary"
          className="button"
        >
          {t('View Borrowed Books')}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

export default UserDetailsTooltip;
