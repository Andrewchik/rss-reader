import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth() {
          try {
            const response = await fetch('http://localhost:3000/api/check-auth', {
              credentials: 'include',
            });
    
            if (response.ok) {
              const data = await response.json();
              setIsLoggedIn(data.isAuthenticated);
            }
          } catch (error) {
            console.error('An error occurred while checking authentication:', error);
          }
        }
    
        checkAuth();
      }, []);


  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        if (response.ok) {
            setIsLoggedIn(true);
            alert('Login successful');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        alert('An error occurred while logging in.');
      }
    },
  });

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in.</p>
          {/* Place your admin panel content here */}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Log In
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignInForm;