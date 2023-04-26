import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from '../../../services/api/axios';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const LOGIN_URL = '/auth/token/login/'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const usernameRef = useRef()
  const errRef = useRef()

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
    usernameRef.current.focus()
  }, [from, isAuthenticated, navigate])

  useEffect(() => {
    setErrMsg('')
  }, [userName, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: userName,
          password: pwd,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      const accessToken = response?.data?.auth_token
      
      localStorage.setItem('access', accessToken)
      localStorage.setItem('isAuthenticated', true)
         
      setUsername('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response')
      } else if (err?.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err?.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      // errRef.current.focus()
      console.log(errMsg)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setUsername(e.target.value)} ref={usernameRef} value={userName} required/>

        <TextField
          name="password"
          label="Password"
          value={pwd}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPwd(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
