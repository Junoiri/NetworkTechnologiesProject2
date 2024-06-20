import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const apiClient = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    apiClient.getAllBooks().then((response) => {
      console.log(response);
    });

    apiClient.getAllLoans().then((response) => {
      console.log(response);
    });
  }, []);

  const getUserId = async () => {
    await apiClient.getUserId();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Button variant="contained" component={Link} to="1" sx={{ m: 1 }}>
          {t('Route 1')}
        </Button>
        <Button variant="contained" component={Link} to="2" sx={{ m: 1 }}>
          {t('Route 2')}
        </Button>
        <Button variant="contained" onClick={getUserId} sx={{ m: 1 }}>
          {t('Get current user id')}
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
