// UsersList.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { UserResponseDto } from '../api/dto/user.dto';
import { useApi } from '../api/ApiProvider';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import UserDetailsTooltip from '../user-details-tooltip/UserDetailsTooltip';
import UserBorrowedBooks from '../user-borrowed-books/UserBorrowedBooks'; // Import UserBorrowedBooks
import './UsersList.css';
import addIcon from '../assets/ic-add.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UsersList() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserResponseDto | null>(
    null,
  );
  const apiClient = useApi();

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getAllUsers();
      if (response.data) {
        setUsers(
          response.data.sort((a, b) =>
            (a.name || '').localeCompare(b.name || ''),
          ),
        );
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.username || '').toLowerCase().includes(search.toLowerCase()),
  );

  const handleViewBorrowedBooks = (user: UserResponseDto) => {
    setSelectedUser(user);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <MenuAppBar />
      </Grid>
      <Grid container direction="row">
        <Grid item xs={10} md={8}>
          <Box className="user-list-container">
            <Typography variant="h5" component="h1" className="user-list-title">
              {t('Users List')}
            </Typography>
            <button
              className="add-button"
              onClick={() => navigate('/userform')}
            >
              <img src={addIcon} alt={t('Add user')} />
            </button>
            <Paper component="form" className="search-box">
              <IconButton className="btn-search" aria-label={t('search')}>
                <SearchIcon />
              </IconButton>
              <InputBase
                className="input-search"
                placeholder={t('Type to Search...')}
                inputProps={{ 'aria-label': t('type to search') }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Paper>
            <List dense className="user-list">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserDetailsTooltip
                    user={user}
                    key={user.id}
                    onViewBorrowedBooks={() => handleViewBorrowedBooks(user)}
                  >
                    <ListItem
                      button
                      className="user-list-item"
                      onClick={() => setSelectedUser(user)}
                    >
                      <ListItemIcon>
                        <PersonIcon className="user-icon" />
                      </ListItemIcon>
                      <ListItemText
                        primary={user.username || ''}
                        secondary={user.email}
                      />
                    </ListItem>
                  </UserDetailsTooltip>
                ))
              ) : (
                <Typography variant="body1" component="p">
                  {t('No user with given username was found.')}
                </Typography>
              )}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {selectedUser && selectedUser.id && (
            <Box m={2}>
              <UserBorrowedBooks userId={selectedUser.id.toString()} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UsersList;
