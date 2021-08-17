import { fade, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  createStyles,
  makeStyles,

  Theme, withStyles
} from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ChevronRightIcon from '@material-ui/icons/SettingsEthernet';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from "react-redux";
import { UrlObject } from 'url';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    placeholder: {
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 13px',
      ...theme.mixins.toolbar,
    },
    buttonCollapse: {
      display: 'flex',
    },
  }),
);

const StyledList = withStyles({
  padding: {
    padding: '8px',
  },
})(List);

const StyledListItem = withStyles((theme: Theme) => ({
  button: {
    borderRadius: '4px',
  },
  gutters: {
    paddingLeft: '8px',
    paddingRight: '8px',
    marginBottom: '6px',
    marginTop: '6px',
  },
  root: {
    '&.Mui-selected': {
      backgroundColor: fade(theme.palette.primary.main, 0.7),
    },
    '&.Mui-selected:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.7),
    },
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
  },
}))(ListItem);

const StyledIconButton = withStyles({
  root: {
    borderRadius: 4,
  }
})(IconButton);

const ThemeTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

type Url = string | UrlObject;

type Pages = {
  key: string;
  href: Url;
  icon: JSX.Element;
  label: JSX.Element;
  inaccessible?: any;
};

const pages: Pages[] = [
  {
    key: 'dashboard',
    href: '/dashboard' as Url,
    icon: <DashboardOutlinedIcon />,
    label: (
      <FormattedMessage id="sidebar.dashboard" defaultMessage="Dashboard" />
    ),
  },
  {
    key: 'team-members',
    href: '/users' as Url,
    icon: <PeopleOutlineOutlinedIcon />,
    label: (
      <FormattedMessage id="sidebar.teammembers" defaultMessage="Team Member" />
    ),
    inaccessible: ['member', 'manager'],
  },
  {
    key: 'projects',
    href: '/projects' as Url,
    icon: <FolderOutlinedIcon />,
    label: <FormattedMessage id="sidebar.projects" defaultMessage="Projects" />,
  },
  {
    key: "tasks",
    href: "/tasks" as Url,
    icon: <EventNoteOutlinedIcon />,
    label: <FormattedMessage id="sidebar.tasks" defaultMessage="Tasks" />,
  },
  // {
  //   key: 'timeline',
  //   href: '/timeline' as Url,
  //   icon: <TimelineOutlinedIcon />,
  //   label: <FormattedMessage id="sidebar.timeline" defaultMessage="Timeline" />,
  // },
  {
    key: 'about-us',
    href: '/about' as Url,
    icon: <InfoOutlinedIcon />,
    label: <FormattedMessage id="sidebar.aboutUs" defaultMessage="About Us" />,
  },
];

const messages = defineMessages({
  trash: {
    id: 'sidebar.trash',
    defaultMessage: 'Trash',
  },
});

const Sidebar = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const { currentAccountRole } = useSelector((state: any) => ({
    currentAccountRole: state.authentication.currentAccountRole,
  }));

  const handleFilterInaccessiblePage = (page: any) => {
    return !(page.inaccessible && page.inaccessible.includes(currentAccountRole));
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Box className={classes.toolbar} />
      <Divider />
      <StyledList>
        {pages.filter((page) => handleFilterInaccessiblePage(page)).map((page) =>
          !open ? (
            <Link href={page.href} passHref key={page.key}>
              <ThemeTooltip
                title={page.label}
                placement="right"
                TransitionComponent={Zoom}
              >
                <StyledListItem
                  button
                  selected={router.pathname.includes(page.href.toString())}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.label} />
                </StyledListItem>
              </ThemeTooltip>
            </Link>
          ) : (
              <Link href={page.href} passHref key={page.key}>
                <StyledListItem
                  button
                  selected={router.pathname.includes(page.href.toString())}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.label} />
                </StyledListItem>
              </Link>
            ),
        )}
      </StyledList>

      <Divider />

      <StyledList>
        {!open ? (
          <Link href="/trash" passHref key="trash">
            <ThemeTooltip
              title={intl.formatMessage(messages.trash)}
              placement="right"
            >
              <StyledListItem button selected={router.pathname === '/trash'}>
                <ListItemIcon>
                  <DeleteOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage(messages.trash)} />
              </StyledListItem>
            </ThemeTooltip>
          </Link>
        ) : (
            <Link href="/trash" passHref key="trash">
              <StyledListItem button selected={router.pathname === '/trash'}>
                <ListItemIcon>
                  <DeleteOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage(messages.trash)} />
              </StyledListItem>
            </Link>
          )}
      </StyledList>

      <Divider className={classes.placeholder} />

      <Box className={classes.toolbar}>
        {!open ? (
          <StyledIconButton
            onClick={handleDrawerOpen}
            className={clsx({ [classes.hide]: open })}
            size="small"
            id="btnRight"
          >
            <ChevronRightIcon />
          </StyledIconButton>
        ) : (
            <StyledIconButton onClick={handleDrawerClose} size="small" id="btnLeft">
              <ChevronLeftIcon />
            </StyledIconButton>
          )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
