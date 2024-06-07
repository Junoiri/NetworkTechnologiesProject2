import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function HomePage() {
  const apiClient = useApi();

  apiClient.getAllBooks().then((response) => {
    console.log(response);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Button variant="contained" component={Link} to="1" sx={{ m: 1 }}>
          Route 1
        </Button>
        <Button variant="contained" component={Link} to="2" sx={{ m: 1 }}>
          Route 2
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
