import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
  RadioGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';
import { useApi } from '../api/ApiProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './UserForm.css';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AddUserRequestDto } from '../api/dto/user.dto';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UserForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [role, setRole] = useState<string | undefined>('');
  const [username, setUsername] = useState<string | undefined>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const api = useApi();
  const backIcon = require('../assets/ic-back.png');

  const handleSave = async () => {
    const user = new AddUserRequestDto();
    user.email = email || '';
    user.name = name || '';
    user.password = password || '';
    user.role = role || '';
    user.username = username || '';

    const result = await api.addUser(user);

    if (result.success) {
      toast.success('User added successfully');
      setTimeout(() => {
        navigate('/users');
      }, 4000);
    } else {
      if (result.statusCode === 409) {
        toast.error('Failed to add user. The user already exists.');
      } else {
        toast.error('Failed to add user');
      }
    }
  };

  return (
    <>
      <MenuAppBar />
      <ToastContainer />
      <IconButton
        edge="start"
        color="inherit"
        aria-label={t('back')}
        onClick={() => navigate('/users')}
        className="back-button"
      >
        <img src={backIcon} alt={t('Back')} />
      </IconButton>
      <Container style={{ marginTop: '100px', padding: '0 50px' }}>
        <Grid container spacing={4} direction="row" justifyContent="center">
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <TextField
                label={t('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label={t('Name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('Password')}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={t('toggle password visibility')}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t('Password')}
                />
              </FormControl>
              <TextField
                label={t('Username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('Role')}</FormLabel>
                <RadioGroup
                  aria-label={t('role')}
                  defaultValue="Librarian"
                  name="radio-buttons-group"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="Librarian"
                    control={<Radio />}
                    label={t('Librarian')}
                  />
                  <FormControlLabel
                    value="Reader"
                    control={<Radio />}
                    label={t('Reader')}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginTop: '20px' }}
        >
          <Button onClick={handleSave} style={{ width: '50%' }}>
            {t('Save')}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default UserForm;
