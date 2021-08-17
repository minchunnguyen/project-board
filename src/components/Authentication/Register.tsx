import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "next/link";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  textField: {
    width: "33ch",
  },
  button: {
    width: "25ch",
  },
  alignItemsAndJustifyContent: {
    width: "100%",
    height: 720,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: 22,
    background:
      "linear-gradient(to right, rgba(0,200,255,.3), rgba(0,0,200,1))",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "100%",
    padding: "0 30px",
    alignItems: "center",
    fontWeight: "bold",
  },
  text_header: {
    display: "flex",
    justifyContent: "center",
    fontSize: 22,
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    alignItems: "center",
    fontWeight: "bold",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    height: 48,
    width: "100%",
    padding: "0 30px",
    alignItems: "center",
    fontWeight: "bold",
  },
  error: {
    margin: theme.spacing(0.5),
    color: "red",
  },
  label: {
    fontSize: 13,
  },
  hidden: {
    display: "none",
  },
  note: {
    justifyContent: "center",
    alignItems: "right",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  register: any;
  error: any;
};

const Register = (props: Props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email: any) => {
    return /\S+@\S+\.\S+/.test(email) ? true : false;
  };

  const validatePassword = (pass: any, confirm_pass: any) => {
    return pass === confirm_pass ? true : false;
  };

  const handleRegister = () => {
    let _validateEmail = validateEmail(email);
    let _validatePassword = validatePassword(password, confirmpassword);

    setValidEmail(_validateEmail);
    setValidPassword(_validatePassword);

    if (_validateEmail && _validatePassword) {
      props.register({
        email: email,
        password: password,
        // role: role,
      });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.alignItemsAndJustifyContent}>
        <Fragment>
          <FormControl>
            <Card className={classes.root}>
              <CardContent className={clsx(classes.header)}>
                <FormLabel
                  className={clsx(classes.text_header)}
                  component="legend"
                >
                  REGISTRATION FORM
                </FormLabel>
              </CardContent>

              {props.error ? (
                <CardContent>
                  <FormHelperText
                    className={clsx(classes.error)}
                    id="registerStatus"
                  >
                    {props.error}
                  </FormHelperText>
                </CardContent>
              ) : null}

              <CardContent>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  id="email"
                  label="Email"
                  type="text"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {validEmail ? null : (
                  <FormHelperText
                    className={clsx(classes.error)}
                    id="invalidEmail"
                  >
                    Invalid email. Email must be a valid email.
                  </FormHelperText>
                )}
              </CardContent>

              {/* <CardContent>
                <FormControl className={classes.formControl}>
                  <FormLabel
                    className={clsx(classes.margin, classes.label)}
                    component="legend"
                    required
                  >
                    Role
                  </FormLabel>
                  <NativeSelect
                    className={clsx(classes.margin, classes.textField)}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    inputProps={{
                      name: "age",
                      id: "age-native-label-placeholder",
                    }}
                  >
                    <option aria-label="None" value="" disabled>
                      Select your role
                    </option>
                    <option value={1}>1 - Member</option>
                    <option value={2}>2 - Manager</option>
                    <option value={3}>3 - Admin</option>
                  </NativeSelect>
                </FormControl>
              </CardContent> */}

              <CardContent>
                <TextField
                  className={clsx(classes.margin)}
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {validPassword ? null : (
                  <FormHelperText
                    className={clsx(classes.error)}
                    id="invalidPassword"
                  >
                    Make sure your password match.
                  </FormHelperText>
                )}
              </CardContent>

              <CardContent>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  id="confirmpassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {validPassword ? null : (
                  <FormHelperText
                    className={clsx(classes.error)}
                    id="invalidPassword"
                  >
                    Make sure your password match.
                  </FormHelperText>
                )}
              </CardContent>

              <CardActions>
                <Button
                  className={clsx(classes.margin, classes.btn)}
                  variant="contained"
                  color="primary"
                  onClick={() => handleRegister()}
                  disabled={!email || !password || !confirmpassword}
                >
                  SUBMIT
                </Button>
              </CardActions>
              <CardActions className={clsx(classes.margin, classes.note)}>
                <p>
                  Already registered
                  <Link href="/login">
                    <a> login?</a>
                  </Link>
                </p>
              </CardActions>
            </Card>
          </FormControl>
        </Fragment>
      </div>
    </form>
  );
};

export default Register;
