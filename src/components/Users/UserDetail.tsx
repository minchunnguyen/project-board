import React, { useState } from "react";
import User from "../../interfaces/User";
import {
  Box,
  Theme,
  makeStyles,
  createStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  DialogActions,
  InputLabel,
  DialogContentText,
  NativeSelect,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { useDispatch } from "react-redux";
import { updateUserRequest, uploadPhotoRequest } from "../../redux/Users/actions";
import Photo from "../../interfaces/Photo";

type Props = {
  user: User;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    overview: {
      gridArea: "overview",
      textAlign: "center",
    },
    personalInfo: {
      gridArea: "personal",
    },
    projectInfo: {
      gridArea: "project",
    },
    tasksAssigned: {
      gridArea: "tasks",
    },
    avatar: {
      height: 200,
      width: 200,
      borderRadius: "36%",
      margin: "16px auto",
      fontSize: 72,
      textTransform: "uppercase",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    tableContainer: {
      maxHeight: 440,
    },
    overflow: {
      overflow: "hidden",
    },
    actionButton: {
      justifyContent: 'center',
    },
    error: {
      color: "red",
    },
  })
);

const InfoWithLabel = ({ label, text }: { label: string; text: string }) => {
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

const UserDetail = ({ user }: Props) => {
  const [isEditPerson, setIsEditPerson] = useState(false);

  const [firstName, setFirstName] = useState( user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone + "");
  const [address, setAddress] = useState(user.address ? user.address : "No Address");
  const [role, setRole] = useState(user.role?.roleName ? user.role?.id : "0")

  const [photoPopup, setPhotoPopup] = useState({ open: false, message: "" });
  const photo = user.photo as Photo [];
  const photoURL = photo[photo.length-1]
    ? "https://backendtest.bluecoindolphin.club/" + photo[photo.length-1].photoName
    : "";
  const [image, setImage] = useState({ preview: photoURL, raw: "" });

  const [validEmail, setValidEmail] = useState(true);

  const validateEmail = (email: any) => {
    return /\S+@\S+\.\S+/.test(email) ? true : false;
  };

  const classes = useStyles();

  const editToggle = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone + "");
    setAddress(user.address ? user.address : "No Address");
    setIsEditPerson(!isEditPerson);
  };

  const dispatch = useDispatch()

  const handleOK = () => {
    let _validateEmail = validateEmail(email);
    setValidEmail(_validateEmail);
    if (_validateEmail) {
      const userEdit: any = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: user.password,
        isDeleted: false,
        address: address,
        role: Number(role)
      };

      dispatch(updateUserRequest(user.id , userEdit));
      editToggle();
    }
  };

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

  const handlePhotoPopupClose = () =>{
    setPhotoPopup({ open: false, message: "" })
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
    dispatch(uploadPhotoRequest(user.id, image.raw));
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

  const isNumeric = (value : string) => {
    return /^-{0,1}\d+$/.test(value);
  };

  const onChangePhone = (value: string) => {
      if(isNumeric(value) || value == ""){
          setPhone(value);
      }
  }

  const intl = useIntl();

  const table = defineMessages({
    firstName: {
      id: 'user.table.firstname',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'user.table.lastname',
      defaultMessage: 'Last Name',
    },
    address: {
      id: 'user.table.address',
      defaultMessage: 'Address',
    },
    email: {
      id: 'user.table.email',
      defaultMessage: 'Email',
    },
    phone: {
      id: 'user.table.phone',
      defaultMessage: 'Phone',
    },
    role: {
      id: 'user.table.role',
      defaultMessage: 'Role',
    },
    size: {
      id: 'user.photo.sizeError',
      defaultMessage: 'Image must not larger than 1Mb. Please check again!',
    },
    file: {
      id: 'user.photo.fileError',
      defaultMessage: 'File not a image. Please check again!',
    },
    selectRole:{
      id: 'user.create.selectRole',
      defaultMessage: 'Select role',
    },
  });

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
          <InfoWithLabel label={intl.formatMessage(table.firstName)} text={user.firstName} />
          <InfoWithLabel label={intl.formatMessage(table.lastName)} text={user.lastName} />
          <InfoWithLabel label={intl.formatMessage(table.address)} text={user.address ? user.address : "No Address"} />
          <InfoWithLabel label={intl.formatMessage(table.email)} text={user.email} />
          <InfoWithLabel label={intl.formatMessage(table.phone)} text={user.phone + ""} />
          <InfoWithLabel label={intl.formatMessage(table.role)} text={user.role?.roleName ? user.role?.roleName : "No Role"} />
        </CardContent>
        <Dialog open={isEditPerson} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"><FormattedMessage id="user.edit.title" defaultMessage="Edit user" /></DialogTitle>
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
                    inputProps={{
                        maxlength: 10,
                    }}
                    fullWidth
                    value={phone}
                    onChange={(e) => onChangePhone(e.target.value)}
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
                    {intl.formatMessage(table.selectRole)}
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
            <Button onClick={editToggle} color="primary">
              <FormattedMessage id="btn.cancel" defaultMessage="Cancel"/>
            </Button>
            <Button onClick={handleOK} color="primary">
              <FormattedMessage id="btn.ok" defaultMessage="OK"/>
            </Button>
          </DialogActions>
        </Dialog>
      </Card>

    </Box>
  );
};

export default UserDetail;
