import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import FormHelperText from '@material-ui/core/FormHelperText';
import Sketch from '../../assets/Sketch';
import Logo from '../../assets/Logo';

const useStyles = makeStyles(() => ({
  // '@keyframes rotate': {
  //   '0%': {
  //     transform: 'rotate(0deg)',
  //   },
  //   '100%': {
  //     transform: 'rotate(360deg)',
  //   },
  // },

  '@keyframes wobble': {
    from: {
      transform: 'rotate(20deg) translate3d(0, 0, 0)',
    },

    '15%': {
      transform:
        'rotate(20deg) translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
    },

    '30%': {
      transform: 'rotate(20deg) translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
    },

    '45%': {
      transform:
        'rotate(20deg) translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
    },

    '60%': {
      transform: 'rotate(20deg) translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
    },

    '75%': {
      transform:
        'rotate(20deg) translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
    },

    to: {
      transform: 'rotate(20deg) translate3d(0, 0, 0)',
    },
  },

  loginPageWrapper: {
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: '9fr 1fr 6fr',
    height: '100vh',
    alignItems: 'center',
  },
  illustration: {
    height: '100%',
    padding: 30,
    backgroundColor: '#3e434c',
    // backgroundImage: 'linear-gradient(75deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    backgroundImage:
      'linear-gradient(75deg, #a5c1b5 0%, #20a6b5 51%, #24a4d4 75%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    animation: `$wobble 2500ms ease infinite`,
    fill: '#518bc3',
    width: '3.5rem',
    height: '3.5rem',
    marginBottom: 10,
  },
  separator: {
    position: 'relative',
    width: 200,
    height: '100%',
    transform: 'translateX(-20px)',

    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      backgroundColor: '#24a4d4',
      clipPath: 'polygon(100% 0, 0 0, 0 100%)',
    },

    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 40,
    width: '100%',
    maxWidth: 550,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '10px',
    position: 'relative',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#646464',
    marginBottom: '30px',
  },
  form: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '10%',

    '& .MuiFormLabel-root': {
      color: 'rgba(0, 0, 0, 0.54)',
    },

    '& .MuiInputBase-root': {
      color: 'rgba(0, 0, 0)',
    },

    '& .MuiIconButton-root': {
      color: 'rgba(0, 0, 0, 0.54)',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },

    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
    },

    '& .MuiOutlinedInput-input:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 100px #f4faff inset',
      '-webkit-text-fill-color': '#000',
    }
  },
  control: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  actionButtons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    fontWeight: 'bold',
  },
  register: {
    textDecoration: 'none',
    color: '#518bc3',
    fontWeight: 'bold',
    transition: 'all 200ms ease',

    '&:hover': {
      opacity: 0.8,
    },
  },
  errorWrapper: {
    width: '100%',
    margin: '15px 0',
  },
  message: {
    width: '100%',
    color: 'green',
  },
  error: {
    width: '100%',
    color: 'red',
  },
}));

type Props = {
  logIn: any;
  message: any;
  error: any;
};

const Login = ({ logIn, message, error }: Props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let _validateEmail = validateEmail(email);
    setValidEmail(_validateEmail);

    if (_validateEmail) {
      logIn({ email: email, password: password });
    }
  };

  const validateEmail = (email: any) => {
    return /\S+@\S+\.\S+/.test(email) ? true : false;
  };

  return (
    <div className={classes.loginPageWrapper}>
      <div className={classes.illustration}>
        <Sketch style={{ minWidth: 350 }} />
      </div>
      <div className={classes.separator}></div>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.wrapper}>
          <Logo className={classes.logo} />
          <div className={classes.heading}>Sign in to your account</div>
          <FormControl error={!validEmail} className={classes.control}>
            <TextField
              className={classes.input}
              variant='outlined'
              id='email'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl className={classes.control} variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              className={classes.input}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>

          <div className={classes.actionButtons}>
            <div>
              <Link href='/register'>
                <a className={classes.register}>Create new account</a>
              </Link>
            </div>
            <Button
              type='submit'
              className={clsx(classes.btn)}
              variant='contained'
              color='primary'
            >
              Login
            </Button>
          </div>

          <div className={classes.errorWrapper}>
            {!validEmail ? (
              <FormHelperText className={clsx(classes.error)} id='invalidEmail'>
                The email address is invalid.
              </FormHelperText>
            ) : error || message ? (
              <FormHelperText
                className={clsx(error ? classes.error : classes.message)}
                id='registerStatus'
              >
                {error || message}
              </FormHelperText>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
