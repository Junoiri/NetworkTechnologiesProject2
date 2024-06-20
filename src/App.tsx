import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';
import LoanList from './loan-list/LoanList';
import LoanForm from './loan-form/LoanForm';
import ApiProvider from './api/ApiProvider';
import { useState } from 'react';
import BookForm from './book-form/BookForm';
import UsersList from './users-list/UsersList';
import UserForm from './user-form/UserForm';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route
              path="/login"
              element={<LoginForm onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="/books" element={<BookList />} />
            <Route path="/bookform" element={<BookForm />} />
            <Route path="/loans" element={<LoanList />} />
            <Route path="/loanform" element={<LoanForm />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home/*" element={<HomePage />}>
              <Route
                path="1"
                element={
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                      backgroundColor: 'red',
                    }}
                  />
                }
              />
              <Route
                path="2"
                element={
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                      backgroundColor: 'blue',
                    }}
                  />
                }
              />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
