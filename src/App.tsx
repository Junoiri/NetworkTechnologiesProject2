import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';
import LoanList from './loan-list/LoanList';
import ApiProvider from './api/ApiProvider';
import { useState } from 'react';
import BookForm from './book-form/BookForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/books" element={<BookList />} />
          <Route path="/bookform" element={<BookForm />} />
          <Route path="/loans" element={<LoanList />} />
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
    </BrowserRouter>
  );
}

export default App;
