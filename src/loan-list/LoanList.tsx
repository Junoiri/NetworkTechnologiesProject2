import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import './LoanList.css';
import LoanDetailsTooltip from '../loan-details-tooltip/LoanDetailsTooltip';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { LoanDto } from '../api/dto/loan.dto';
import { useApi } from '../api/ApiProvider';

function LoanList() {
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const apiClient = useApi();

  const fetchLoans = async () => {
    try {
      const response = await apiClient.getAllLoans();
      if (response.data) {
        setLoans(response.data);
      } else {
        console.error('No data received from getAllLoans');
      }
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <MenuAppBar />
      </Grid>
      <Grid item>
        <Box className="loan-list-container">
          <List dense className="loan-list">
            <Typography variant="h5" component="h1" className="loan-list-title">
              Loan List
            </Typography>
            {loans.map((loan) => (
              <LoanDetailsTooltip loan={loan} key={loan.loanId}>
                <ListItem button className="loan-list-item">
                  <ListItemIcon>
                    <LibraryBooksIcon className="loan-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Loan ID: ${loan.loanId}`}
                    secondary={`Book ID: ${loan.bookId}, User ID: ${loan.userId}`}
                  />
                </ListItem>
              </LoanDetailsTooltip>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoanList;
