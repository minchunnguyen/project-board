import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { useLocale } from "../../context/IntlProvider";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Logo from "../../assets/Logo";
import Eng from "../../assets/languages/UkIcon";
import Fra from "../../assets/languages/FrIcon";
import Vni from "../../assets/languages/VnIcon";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/Authentication/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
// import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    logoContainer: {
      width: "240px",
    },
    logo: {
      transform: "rotate(35deg)",
    },
    logoText: {
      fontWeight: 300,
      display: "inline-block",
      marginLeft: 8,
    },
    placeHolder: {
      flexGrow: 1,
      textAlign: "right",
    },
    languagesBox: {
      borderRadius: 4,
      paddingLeft: 4,
      paddingRight: 4,
    },
    linkstyle: {
      textDecoration: "none", 
      color: "white"
    }
  })
);

const languages = [
  { locale: "en", icon: <Eng /> },
  { locale: "fr", icon: <Fra /> },
  { locale: "vi", icon: <Vni /> },
];

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const { setLocale, getCurrentLocale } = useLocale();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
  const [anchorLanguage, setAnchorLanguage] = useState<null | HTMLElement>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState(Number);

  // handle Profile
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfile(null);
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  // handle Language
  const handleListLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleMenuLanguageClick = (locale: string, index: number) => {
    setLocale(locale);
    setSelectedIndex(index);
    setAnchorLanguage(null);
  };

  useEffect(() => {
    setSelectedIndex(getCurrentLocale());
  }, []);

  const handleMenuLanguageClose = () => {
    setAnchorLanguage(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* Logo */}
        <Box className={classes.logoContainer}>
          <Logo className={classes.logo} />
          <Typography variant="h6" noWrap className={classes.logoText}>
            eXperimentum
          </Typography>
        </Box>
        <Box className={classes.placeHolder}></Box>

        {/* Theme switch */}
        <Switch
          defaultChecked
          color="default"
          onChange={themeContext.themeSwitch}
          name="switchTheme"
          inputProps={{ "aria-label": "theme switch" }}
        />

        {/* Languages */}
        <Box>
          <List component="nav" aria-label="locale">
            <ListItem
              className={classes.languagesBox}
              button
              aria-haspopup="true"
              aria-controls="language-menu"
              aria-label="languages box"
              onClick={handleListLanguageClick}
            >
              <ListItemIcon>{languages[selectedIndex].icon}</ListItemIcon>
            </ListItem>
          </List>

          <Menu
            id="language-menu"
            anchorEl={anchorLanguage}
            keepMounted
            open={Boolean(anchorLanguage)}
            onClose={handleMenuLanguageClose}
          >
            {languages.map((language, index) => (
              <MenuItem
                id={`lang-${language.locale}`}
                key={index}
                selected={index === selectedIndex}
                onClick={() => handleMenuLanguageClick(language.locale, index)}
              >
                {language.icon}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Profile */}
        <Box>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileClick}
            color="inherit"
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorProfile}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorProfile)}
            onClose={handleProfileClose}
          >
            <MenuItem>
              {/* <Link href="/profile" className={classes.linkstyle}>My account</Link> */}
              {/* <a href="/profile" className={classes.linkstyle}><div>My Account</div></a> */}
              <Link href="/profile"><a className={classes.linkstyle}>
                <FormattedMessage id="header.myaccount" defaultMessage="My Account"/></a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogOut}><FormattedMessage id="header.logout" defaultMessage="Log out"/></MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
