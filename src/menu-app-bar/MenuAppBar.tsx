import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const styles = {
  root: {
    backgroundColor: '#181825',
  },
  menuItem: {
    color: 'white',
  },
  appBarText: {
    color: 'white',
  },
  menuAndProfileIcons: {
    color: '#CBA6F7',
  },
};

export default function MenuAppBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={styles.root}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            ...styles.menuAndProfileIcons,
          }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.root }}
        >
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleNavigate('/home')}
          >
            Home Page
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleNavigate('/books')}
          >
            Book List
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleNavigate('/loans')}
          >
            Loans List
          </MenuItem>
        </Menu>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            ...styles.appBarText,
          }}
        >
          Library Webapp
        </Typography>
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate('/login')}
            sx={{
              ml: 2,
              ...styles.menuAndProfileIcons,
            }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
