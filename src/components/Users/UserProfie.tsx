import {
  Box,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  CardActions,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Grid,
  DialogActions,
  TextField,
  FormLabel,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText, 
  InputLabel,
  DialogContentText} from "@material-ui/core";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailRequest,
  changeUserPasswordRequest,
  closePopupPassword,
  uploadPhotoRequest,
} from "../../redux/Users/actions";
import { updateUserRequest } from "../../redux/Users/actions";
import LockIcon from "@material-ui/icons/Lock";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type Props = {
  accountId: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: theme.spacing(3),
    gridTemplateAreas: `'overview personal project' 
                          'tasks tasks tasks'`,
    gridTemplateColumns: "1fr 2fr",

    [theme.breakpoints.down("md")]: {
      gridTemplateAreas: `'overview' 'personal' 'project' 'tasks'`,
      gridTemplateColumns: "1fr",
    },
  },
  passWordChange: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 500,
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
  label: {
    fontSize: 13,
  },
  hidden: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  overview: {
    gridArea: "overview",
    textAlign: "center",
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: "36%",
    margin: "16px auto",
    fontSize: 72,
    textTransform: "uppercase",
  },
  personalInfo: {
    gridArea: "personal",
  },
  overflow: {
    overflow: "hidden",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    margin: theme.spacing(0.5),
    color: "red",
  },
  dialogTitle: {
    color: "blue"
  },
  actionButton: {
    justifyContent: 'center',
  },
}));

const PersonalInfo = ({ label, text }: { label: JSX.Element; text: string }) => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <Typography
        gutterBottom
        variant="body1"
        component="label"
        display="inline"
        color="textSecondary"
        align="left"
      >
        {label}
      </Typography>
      <Typography
        gutterBottom
        variant="body1"
        component="span"
        display="inline"
        align="right"
      >
        {text}
      </Typography>
    </Box>
  );
};
const UserProfile = ({ accountId }: Props) => {
  const [isChangePassword, setChangePassword] = useState(false);
  const [isEditPerson, setIsEditPerson] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetailRequest(accountId));
  }, []);

  const { checkMessage } = useSelector((state: any) => ({
    checkMessage: state.users.message,
  }));

  const { openPopup } = useSelector((state: any) => ({
    openPopup: state.users.openPopupPassword,
  }));

  const { personalInfomation } = useSelector((state: any) => ({
    personalInfomation: state.users.userDetail,
  }));

  const [firstName, setFirstName] = useState(
    personalInfomation ? personalInfomation.firstName : ""
  );
  const [lastName, setLastName] = useState(
    personalInfomation ? personalInfomation.lastName : ""
  );
  const [email, setEmail] = useState(
    personalInfomation ? personalInfomation.email : ""
  );
  const [phone, setPhone] = useState(
    personalInfomation ? personalInfomation.phone : ""
  );
  const [address, setAddress] = useState(
    personalInfomation ? personalInfomation.address : ""
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [photoPopup, setPhotoPopup] = useState({ open: false, message: "" });
  const photo = personalInfomation? personalInfomation.photo: [];
  const photoURL = photo[photo.length-1]
    ? "https://backendtest.bluecoindolphin.club/" + photo[photo.length-1].photoName
    : "";
  const [image, setImage] = useState({ preview: photoURL, raw: "" });

  const intl = useIntl();
  const table = defineMessages({
    size: {
      id: 'user.photo.sizeError',
      defaultMessage: 'Image must not larger than 1Mb. Please check again!',
    },
    file: {
      id: 'user.photo.fileError',
      defaultMessage: 'File not a image. Please check again!',
    },
  });
  
  const getExtension = (fileName: string) =>{
    const parts = fileName.split('.');
    return parts[parts.length - 1];
  }

  const isImage = (file: File) => {
    var ext = getExtension(file.name);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if(isImage(file)){
        if(file.size > 1048576){
         setPhotoPopup({ open: true, message: intl.formatMessage(table.size) })
        }else{
          setImage({
          preview: URL.createObjectURL(file),
          raw: file,
          });
        }
      }else{
        setPhotoPopup({ open: true, message: intl.formatMessage(table.file) })
      }
    }
  };

  const handleSavePhoto = () => {
    dispatch(uploadPhotoRequest(personalInfomation.id, image.raw));
    setImage({
      preview: URL.createObjectURL(image.raw),
      raw: "",
    })
  }

  const handleCancelImage = () => {
    setImage({
      preview: photoURL,
      raw: "",
    });
  }

  const handlePhotoPopupClose = () =>{
    setPhotoPopup({ open: false, message: "" })
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changePasswordToggle = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePassword(!isChangePassword);

    setValidPassword(validatePassword(newPassword, confirmPassword));
  };

  const validatePassword = (pass: any, confirm_pass: any) => {
    return pass === confirm_pass ? true : false;
  };

  const handleChangePassword = () => {

    let _validatePassword = validatePassword(newPassword, confirmPassword);
    if (_validatePassword) {
      dispatch(changeUserPasswordRequest(oldPassword, newPassword));
      changePasswordToggle();
      
    } 
    setValidPassword(_validatePassword);
    
  };
  const editToggle = () => {
    setFirstName(personalInfomation ? personalInfomation.firstName : "");
    setLastName(personalInfomation ? personalInfomation.lastName : "");
    setEmail(personalInfomation ? personalInfomation.email : "");
    setPhone(personalInfomation ? personalInfomation.phone : "");
    setAddress(personalInfomation ? personalInfomation.address : "");
    setIsEditPerson(!isEditPerson);
  };
  const handleOK = () => {
    const userEdit: any = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: Number(phone),
      address: address,
      role: {
        id: personalInfomation.role?.id,
      },
    };
    dispatch(updateUserRequest(accountId, userEdit));
    editToggle();
  };
  const handleClose = () => {
    dispatch(closePopupPassword());
  };

  const isNumeric = (value : string) => {
    return /^-{0,1}\d+$/.test(value);
  };

  const onChangePhone = (value: string) => {
    if(isNumeric(value) || value == ""){
        setPhone(value);
    }
  }

  return (
    <Box className={classes.root}>
      <Card className={classes.overview}>
        <CardContent>
        <InputLabel htmlFor="upload-button">
            {image.preview ? (
              <Avatar
                variant="rounded"
                alt={firstName}
                src={image.preview}
                className={classes.avatar}
              />
            ) : (
              <Avatar
                variant="rounded"
                alt={firstName}
                src="/broken-image.jpg"
                className={classes.avatar}
              />
            )}
          </InputLabel>
          <TextField
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={(e) => handleChange(e)}
          />
          {image.raw ? (
            <CardActions className={classes.actionButton}>
              <Button size="small" color="primary" onClick={handleCancelImage}>
                <FormattedMessage id="btn.cancel" defaultMessage="Cancel"/>
              </Button>
              <Button size="small" color="primary" onClick={handleSavePhoto}>
               <FormattedMessage id="btn.ok" defaultMessage="OK"/>
              </Button>
            </CardActions>
          ) : (
            <div></div>
          )}
        </CardContent>
      </Card>
      
      <Dialog
        open={photoPopup.open}
        onClose={handlePhotoPopupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title"><FormattedMessage id="user.photo.titleError" defaultMessage="Photo Upload Error"/></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {photoPopup.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePhotoPopupClose} color="primary">
            <FormattedMessage id="btn.close" defaultMessage="Close"/>
          </Button>
        </DialogActions>
      </Dialog>

      <Card className={classes.personalInfo}>
        <CardHeader
          action={
            <CardActions>
              <Button size="small" color="primary" onClick={editToggle}>
                <FormattedMessage
                  id="user.detail.btn.edit"
                  defaultMessage="Edit"
                />
              </Button>
            </CardActions>
          }
          title={
            <FormattedMessage
              id="user.detail.personalInfo"
              defaultMessage="Personal Info"
            />
          }
        />
        <CardContent>
          <PersonalInfo
            label={<FormattedMessage id="user.table.firstname" defaultMessage="First Name" />}
            text={personalInfomation ? personalInfomation.firstName : ""}
          />
          <PersonalInfo
            label={<FormattedMessage id="user.table.lastname" defaultMessage="Last Name" />}
            text={personalInfomation ? personalInfomation.lastName : ""}
          />
          <PersonalInfo
            label={<FormattedMessage id="user.table.address" defaultMessage="Address" />}
            text={personalInfomation ? personalInfomation.address : ""}
          />
          <PersonalInfo
            label={<FormattedMessage id="user.table.email" defaultMessage="Email" />}
            text={personalInfomation ? personalInfomation.email : ""}
          />
          <PersonalInfo
            label={<FormattedMessage id="user.table.phone" defaultMessage="Phone" />}
            text={personalInfomation ? personalInfomation.phone : ""}
          />
          <PersonalInfo
            label={<FormattedMessage id="user.table.role" defaultMessage="Role" />}
            text={personalInfomation ? personalInfomation.role.roleName : ""}
          />
          <Button size="small" color="primary" onClick={changePasswordToggle}>
            <FormattedMessage id="btn.changepassword" defaultMessage="Change Password"></FormattedMessage>
          </Button>
        </CardContent>

        <Dialog
          open={openPopup}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {checkMessage && checkMessage.message ? (
            <div>
            <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{
               <FormattedMessage id="user.userprofile.title.changepassword"/>
              }
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
               <FormattedMessage id="user.userprofile.dialog.changepasswordsuccess" defaultMessage="Your Password had been changed successfully!"/>
             </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
              <FormattedMessage id="btn.close" defaultMessage="Close"/>
              </Button>
            </DialogActions>
            </div>
          ) : (
            <div>
            <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{
                <FormattedMessage id="user.userprofile.title.changepassword" defaultMessage="Change Password"/>
              }
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
            <FormattedMessage id="user.userprofile.dialog.changepasswordfail" defaultMessage="You are fail in changing password!"/>
             </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
              <FormattedMessage id="btn.close" defaultMessage="Close"/>
              </Button>
            </DialogActions>
            </div>
          )}
        </Dialog>
      </Card>
      {/* Dialog Edit Personal Info */}
      <Dialog open={isEditPerson} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><FormattedMessage id="user.detail.personalInfo.titleEdit" defaultMessage="Edit Personal Info"/></DialogTitle>
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
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label={<FormattedMessage id="user.table.lastname" defaultMessage="Last Name" />}
                  fullWidth
                  value={lastName}
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label={<FormattedMessage id="user.table.email" defaultMessage="Email" />}
                  fullWidth
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  label={<FormattedMessage id="user.table.address" defaultMessage="Address" />}
                  fullWidth
                  value={address}
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  name="phone"
                  label={<FormattedMessage id="user.table.phone" defaultMessage="Phone" />}
                  fullWidth
                  value={phone}
                  variant="outlined"
                  onChange={(e) => onChangePhone(e.target.value)}
                  inputProps={{
                      maxlength: 10,
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={editToggle} color="primary">
          {<FormattedMessage id="btn.cancel" defaultMessage="Cancel" />}
          </Button>
          <Button onClick={handleOK} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Change Password */}
      <Dialog open={isChangePassword}>
        <Card>
          <CardContent className={clsx(classes.header)}>
            <FormLabel className={clsx(classes.text_header)} component="legend">
            {<FormattedMessage id="user.userprofile.title.changepassword" defaultMessage="Change Password" />}
            </FormLabel>
          </CardContent>
          <CardContent>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              id="oldPassword"
              label= {<FormattedMessage id="input.currentpassword" defaultMessage="Current Password"/>}
              type={showCurrentPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              // placeholder="Enter your current password"
              required
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
                      onClick={handleClickShowCurrentPassword}
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardContent>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              id="newPassword"
              label= {<FormattedMessage id="input.newpassword" defaultMessage="New Password"/>}
              // placeholder="Enter your new password"
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
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
                      onClick={handleClickShowNewPassword}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardContent>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              id="confirmPass"
              label= {<FormattedMessage id="input.confirmpassword" defaultMessage="Confirm Password"/>}
              // placeholder="Confirm password"
              value={confirmPassword}
              type={showConfirmPassword ? "text": "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> <LockIcon /></InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>,
              }}
            />
            {validPassword ? null : (
                  <FormHelperText
                    className={clsx(classes.error)}
                    id="invalidPassword"
                  >
                    <FormattedMessage id="user.userprofile.error.matchedpassword" defaultMessage="Confirm Password is not matched"/>
                  </FormHelperText>
                )}
          </CardContent>
        </Card>
        <DialogActions>
          <Button
            className={clsx(classes.btn)}
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
           <FormattedMessage id="btn.change" defaultMessage="Change"/>
          </Button>
          <Button
            className={clsx(classes.btn)}
            variant="contained"
            color="default"
            onClick={changePasswordToggle}
          >
             <FormattedMessage id="btn.cancel" defaultMessage="Change"/>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
