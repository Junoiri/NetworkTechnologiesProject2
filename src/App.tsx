import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home/*" element={<HomePage />}>
        <Route
          path="1"
          element={
            <div
              style={{ height: '300px', width: '100%', backgroundColor: 'red' }}
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
  );
}

export default App;
