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
import { useEffect } from 'react';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import icPlS from '../assets/ic_pl_s.png';
import icEnS from '../assets/ic_en_s.png';
import LanguageIcon from '@mui/icons-material/Language';
import './MenuAppBar.css';

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
  const [isStaff, setIsStaff] = useState(false);

  const apiClient = useApi();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    apiClient.getUserId().then((response) => {
      if (response.success && response.data) {
        const userId = Number(response.data);
        if (!isNaN(userId)) {
          apiClient.isUserStaff(userId).then(setIsStaff);
        }
      }
    });
  }, []);

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
          aria-label={t('menu')}
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
            {t('homePage')}
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleNavigate('/books')}
          >
            {t('bookList')}
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleNavigate('/loans')}
          >
            {t('loansList')}
          </MenuItem>
          {isStaff && (
            <MenuItem
              sx={styles.menuItem}
              onClick={() => handleNavigate('/users')}
            >
              {t('users')}
            </MenuItem>
          )}
        </Menu>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            ...styles.appBarText,
          }}
        >
          {t('libraryWebapp')}
        </Typography>
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label={t('englishLanguage')}
            onClick={() => i18n.changeLanguage('en')}
          >
            <img src={icEnS} alt="English" />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label={t('polishLanguage')}
            onClick={() => i18n.changeLanguage('pl')}
          >
            <img src={icPlS} alt="Polish" />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label={t('accountOfCurrentUser')}
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
