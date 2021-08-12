import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  logo: {
    height: '8rem',
    [theme.breakpoints.down('md')]: {
      height: '7rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5rem',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': { backgroundColor: 'transparent' },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: 25,
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 25,
    height: 45,
    '&:hover': { backgroundColor: theme.palette.secondary.light },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': { opacity: 1 },
  },
  drawerIconContainer: {
    '&:hover': { backgroundColor: 'transparent' },
    marginLeft: 'auto',
  },
  drawerIcon: {
    height: 50,
    width: 50,
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
}));

export default function Header({
  value,
  setValue,
  selectedIndex,
  setSelectedIndex,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = React.useMemo(
    () => [
      { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
      {
        name: 'Custom Software Development',
        link: '/customsoftware',
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: 'IOS/Android App Development',
        link: '/mobileapps',
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: 'Website Development',
        link: '/websites',
        activeIndex: 1,
        selectedIndex: 3,
      },
    ],
    []
  );

  const routes = React.useMemo(
    () => [
      {
        name: 'Home',
        link: '/',
        activeIndex: 0,
      },
      {
        name: 'Services',
        link: '/services',
        activeIndex: 1,
        mouseOver: (e) => handleClick(e),
      },
      {
        name: 'The Revolution',
        link: '/revolution',
        activeIndex: 2,
      },
      {
        name: 'About Us',
        link: '/about',
        activeIndex: 3,
      },
      {
        name: 'Contact Us',
        link: '/contact',
        activeIndex: 4,
      },
    ],
    []
  );

  const handleMenuItemClick = (e, i) => {
    handleClose();
    setSelectedIndex(i);
  };

  const onChangeCallback = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    [...menuOptions, ...routes].forEach((route) => {
      switch (pathname) {
        case route.link:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex)
              setSelectedIndex(route.selectedIndex);
          }
          break;
        case '/estimate':
          setValue(false);
          break;
        default:
          break;
      }
    });
  }, [value, selectedIndex, menuOptions, routes, setSelectedIndex, setValue]);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={onChangeCallback}
        indicatorColor="primary"
      >
        {routes.map((route, index) => {
          return (
            <Tab
              key={index}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
              onMouseOver={route.mouseOver}
            />
          );
        })}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/estimate"
        onClick={() => setValue(false)}
      >
        Free Estimate
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            onClick={(e) => {
              handleMenuItemClick(e, i);
              setValue(1);
            }}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            selected={selectedIndex === i && value === 1}
            key={i}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.logo} />
        <List disablePadding>
          {routes.map((route) => {
            return (
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
                key={route.activeIndex}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
              >
                <ListItemText
                  className={
                    value === route.activeIndex
                      ? [classes.drawerItemSelected, classes.drawerItem].join(
                          ' '
                        )
                      : classes.drawerItem
                  }
                >
                  {route.name}
                </ListItemText>
              </ListItem>
            );
          })}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            className={classes.drawerItemEstimate}
            to="/estimate"
            selected={value === 5}
          >
            <ListItemText
              className={
                value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected].join(' ')
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <ElevationScroll>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar disableGutters>
          <Button
            component={Link}
            to="/"
            className={classes.logoContainer}
            onClick={() => setValue(0)}
            disableRipple
          >
            <img src={logo} alt="company logo" className={classes.logo} />
          </Button>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
