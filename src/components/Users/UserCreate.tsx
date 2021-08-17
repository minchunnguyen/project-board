import { useState } from "react";
import { DialogTitle, DialogContent, FormControl, Grid, TextField, DialogActions, Button, makeStyles, createStyles, NativeSelect, FormLabel, FormHelperText, Dialog, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import User from "../../interfaces/User";
import { addUserRequest, closePopupPassword } from "../../redux/Users/actions";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";

type Props = {
    handleClose: any;
  };

  const useStyles = makeStyles(()=>
    createStyles({
      overflow: {
        overflow: 'hidden',
      },
      error: {
        color: "red",
      },
    })
  );

const UserCreate = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const [validEmail, setValidEmail] = useState(true);

    const validateEmail = (email: any) => {
        return /\S+@\S+\.\S+/.test(email) ? true : false;
    };

    const handleCancle = () => {
        props.handleClose();
    };
    const dispatch = useDispatch()
    
    const { openPopup } = useSelector((state: any) => ({
        openPopup: state.users.openPopupPassword,
    }));

    const { checkMessage } = useSelector((state: any) => ({
        checkMessage: state.users.message,
    }));

    const handleOK = () => {
        let _validateEmail = validateEmail(email);
        setValidEmail(_validateEmail);
        if (_validateEmail) {
            const passwordGenerators = `#${phone}`;
            const user: any = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: passwordGenerators,
                isDeleted: false,
                address: address,
                role: Number(role)
            };
            dispatch(addUserRequest(user));
        }
    };

    const isNumeric = (value : string) => {
        return /^-{0,1}\d+$/.test(value);
    };

    const onChangePhone = (value: string) => {
        if(isNumeric(value) || value == ""){
            setPhone(value);
        }
    }

    const classes = useStyles();
    
    const intl = useIntl();

    const user = defineMessages({
        selectRole: {
        id: 'user.create.selectRole',
        defaultMessage: 'Select role',
        },
    });

    const handleClose = () => {
        dispatch(closePopupPassword());
        if(checkMessage.message){
            props.handleClose();
        }
    };

    return(
        //Add a new user
        <div>
            <DialogTitle id="form-dialog-title"><FormattedMessage id="user.create.title" defaultMessage="Create new user" /></DialogTitle>
            <DialogContent className={classes.overflow}>
                <FormControl>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label={<FormattedMessage id="user.table.firstname" defaultMessage="First Name" />}
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label={<FormattedMessage id="user.table.lastname" defaultMessage="Last Name" />}
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="email"
                        name="email"
                        label={<FormattedMessage id="user.table.email" defaultMessage="Email" />}
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                    {validEmail ? null : (
                        <FormHelperText
                            className={classes.error}
                            id="invalidEmail"
                        >
                            Invalid email. Email must be a valid email.
                        </FormHelperText>
                    )}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="address"
                        name="address"
                        label={<FormattedMessage id="user.table.address" defaultMessage="Address" />}
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        label={<FormattedMessage id="user.table.phone" defaultMessage="Phone" />}
                        fullWidth
                        value={phone}
                        onChange={(e) => onChangePhone(e.target.value)}
                        inputProps={{
                            maxlength: 10,
                        }}
                        variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormLabel component="legend">
                        <FormattedMessage id="user.table.role" defaultMessage="Role" />
                    </FormLabel>
                    <NativeSelect
                        // className={clsx(classes.margin, classes.textField)}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        inputProps={{
                            name: "age",
                            id: "age-native-label-placeholder",
                        }}
                    >
                        <option aria-label="None" value="" disabled>
                        {intl.formatMessage(user.selectRole)}
                        </option>
                        <option value={1}>1 - Member</option>
                        <option value={2}>2 - Manager</option>
                        <option value={3}>3 - Admin</option>
                    </NativeSelect>
                    </Grid>
                </Grid>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancle} color="primary">
                    <FormattedMessage id="btn.cancel" defaultMessage="Cancel"/>
                </Button>
                <Button onClick={handleOK} color="primary">
                    <FormattedMessage id="btn.ok" defaultMessage="OK"/>
                </Button>
            </DialogActions>
            <Dialog
            open={openPopup}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            
                <div>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                        {checkMessage && checkMessage.message ? (
                            <FormattedMessage id="user.create.message.success" defaultMessage="Create new user successfully!"/>
                        ) : (
                            <FormattedMessage id="user.create.message.fail" defaultMessage="Email address is already exists. Please try again!"/>
                        )}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            <FormattedMessage id="btn.close" defaultMessage="Close"/>
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default UserCreate;