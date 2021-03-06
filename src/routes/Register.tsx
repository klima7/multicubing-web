import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useAppThunkDispatch, useParentUrl } from '../hooks';
import { register } from '../redux/register/register-actions';
import { useHistory } from 'react-router-dom';

function RegisterPage() {
  useParentUrl('/');

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [emailError, setEmailError] = useState(0);
  const [loginError, setLoginError] = useState(0);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(false);

  const [buttonEnabled, setButtonEnabled] = useState(false);

  const dispatch = useAppThunkDispatch()
  const pending = useAppSelector((state) => state.register.pending)
  const theme = useTheme() as any;

  const history = useHistory();

  function performRegister() {
    const promise = dispatch(register({login: login, email: email, password: password}))
    promise.then(action => {
      if(action.meta.requestStatus === "rejected") {
        if('email' in action.payload) setEmailError(2);
        if('username' in action.payload) setLoginError(2);
      }
      else if(action.meta.requestStatus === "fulfilled") {
        history.push('/login');
      }
    })
  }

  function validateEmail(email: string) {
    if(email.length === 0) return true;
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const targetId = event.target.id;
    if(targetId === 'login') {
      const value = event.target.value
      setLogin(value);
      setLoginError((value.length !== 0 && value.length < 5) ? 1 : 0)
    }
    if(targetId === 'email') {
      const value = event.target.value
      setEmail(value);
      setEmailError((value.length !== 0 && !validateEmail(value)) ? 1 : 0)
    }
    else if(targetId === 'password') {
      const value = event.target.value
      setPassword(value);
      setPasswordError(value.length !== 0 && value.length < 8)
    }
    else if(targetId === 'repeated_password') {
      const value = event.target.value
      setRepeatedPassword(value);
      setRepeatedPasswordError(value.length !== 0 && value !== password)
    }
  }

  function getLoginError(code: number) {
    if(code === 0 || code === 1) {
      return "Minimum 5 characters";
    }
    else if(code === 2) {
      return "Login already taken";
    }
  }

  function getEmailError(code: number) {
    if(code === 0) {
      return "";
    }
    else if(code === 1) {
      return "Invalid email format";
    }
    else if(code === 2) {
      return "Email already taken";
    }
  }

  useEffect(() => {
    const error = loginError || emailError || passwordError || repeatedPasswordError;
    const filled = login.length > 0 && email.length > 0 && 
      password.length > 0 && repeatedPassword.length > 0;
    setButtonEnabled(filled && !error);
  }, [loginError, emailError, passwordError, repeatedPasswordError, login, email, 
    password, repeatedPassword])

  return (
    <div>
        <Grid container>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            <Box sx={{mt: 10}}>
              <Paper variant="outlined" style={{display: 'inline-block', width: '60ex', borderColor: theme.palette.primary.main, borderWidth: '1.2pt', padding: '10pt'}}>
                <Box sx={{my: 2}}>
                  <Typography variant="h4" >Register</Typography>
                </Box>
                <div>
                  <TextField 
                  error={loginError !== 0}
                  id="login"
                  label="Login" 
                  variant="outlined" 
                  autoComplete="false"
                  onChange={handleChange} 
                  helperText={getLoginError(loginError)}
                  style={{width: '100%', marginBottom: '10px'}}
                  />
                </div>
                <div>
                  <TextField 
                  error={emailError !== 0}
                  id="email"
                  label="Email" 
                  variant="outlined" 
                  autoComplete="false"
                  onChange={handleChange} 
                  style={{width: '100%', marginBottom: '10px'}}
                  helperText={getEmailError(emailError)}
                  />
                </div>
                <div>
                  <TextField 
                  error={passwordError}
                  id="password"
                  label="Password" 
                  variant="outlined" 
                  type="password" 
                  autoComplete="false"
                  onChange={handleChange} 
                  helperText="Minimum 8 characters"
                  style={{width: '100%', marginBottom: '10px'}} 
                  />
                </div>
                <div>
                  <TextField 
                  error={repeatedPasswordError}
                  id="repeated_password"
                  label="Repeat Password" 
                  variant="outlined" 
                  type="password" 
                  autoComplete="false"
                  onChange={handleChange} 
                  style={{width: '100%', marginBottom: '10px'}} 
                  helperText={repeatedPasswordError ? "Passwords doesn't match" : ' '}
                  />
                </div>
                <div>
                  {!pending ?
                  <Button 
                  variant="contained" 
                  disabled={!buttonEnabled}
                  onClick={performRegister}
                  style={{width: '100%', boxShadow: 'none'}}
                  >Register</Button> 
                  :
                  <CircularProgress /> 
                  }
                </div>
              </Paper>
            </Box>
          </Grid>
        </Grid>
    </div>
  );
}

export default RegisterPage;
