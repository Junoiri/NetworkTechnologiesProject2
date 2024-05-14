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
import { mockLoans } from '../data/mockLoans';
import './LoanList.css';
import LoanDetailsTooltip from '../loan-details-tooltip/LoanDetailsTooltip';
import MenuAppBar from '../menu-app-bar/MenuAppBar';

function LoanList() {
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
            {mockLoans.map((loan) => (
              <LoanDetailsTooltip loan={loan} key={loan.LoanID}>
                <ListItem button className="loan-list-item">
                  <ListItemIcon>
                    <LibraryBooksIcon className="loan-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Loan ID: ${loan.LoanID}`}
                    secondary={`Book ID: ${loan.BookID}, User ID: ${loan.UserID}`}
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
