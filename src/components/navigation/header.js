import React, { useEffect, useState } from "react";
import { NavLink, Switch, Redirect } from "react-router-dom";
import { EmailOutlined, NotificationsOutlined, ExploreOutlined, PersonOutlineOutlined, HomeOutlined, SearchOutlined } from '@material-ui/icons';
import testImage from '../../images/logo.png';
import Logo from '../../images/logo.png';
import { AppBar, Toolbar, IconButton, Badge, InputBase, MenuItem, Menu, Hidden, Box, Divider, FormControl } from "@material-ui/core";
import BottomNav from './bottom-navigation';
import MobileTop from "./mobile-top";

function Header({ username }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userSearchUrl, setUserSearchUrl] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setUserSearch = (e) => {
        setIsSearched(false);
        setUserSearchUrl("/" + e.target.value);
    }
    function redirectUrl(url) {
        Redirect(`/${url}`)
        handleClose();
    }

    function findUser(event) {
        event.preventDefault();
        if (userSearchUrl.length >= 4) {
            setIsSearched(true);
        }

    }

    return (
        <React.Fragment>
            <Hidden smDown>
                <AppBar position="sticky" style={{ backgroundColor: "white" }}>
                    <Toolbar className="main-header ">
                        <div className="container">
                            <div className="h-main">
                                <NavLink edge="start" to="/">
                                    <img src={Logo} width="30px" alt="Placeholder image" />
                                </NavLink>
                                <nav className="h-nav">
                                    <NavLink to="/">
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="primary"
                                        >
                                            <HomeOutlined style={{ fontSize: 30 }} />
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to="/notifications">
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="primary"
                                        >
                                            <Badge badgeContent={1} color="primary">
                                                <NotificationsOutlined style={{ fontSize: 30 }} />
                                            </Badge>
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to="/explore">
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="primary"
                                        >
                                            <ExploreOutlined style={{ fontSize: 30 }} />
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to="/message">
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="primary">
                                            <Badge badgeContent={4} color="primary">
                                                <EmailOutlined style={{ fontSize: 30 }} />
                                            </Badge>
                                        </IconButton>
                                    </NavLink>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        color="primary"
                                        onClick={handleClick}
                                    >
                                        <PersonOutlineOutlined style={{ fontSize: 30 }} />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        style={{ top: 40 }}
                                        onClose={handleClose}
                                        elevation={1}
                                    >
                                        <div style={{ width: 300 }}>
                                            <MenuItem onClick={handleClose} component={NavLink} to={() => { return "/" + username }}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose} component={NavLink} to="/settings">My account settings</MenuItem>
                                            <MenuItem onClick={handleClose} component={NavLink} to="/settings">Analytics</MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </div>
                                    </Menu>
                                </nav>
                                <div className="search s-input">
                                    <div className="search-icon">
                                        <SearchOutlined style={{ color: "grey !important" }} style={{ fontSize: 20 }} />
                                    </div>
                                    <form onSubmit={findUser}>
                                        <InputBase
                                            placeholder="Search…"
                                            className=""
                                            onChange={setUserSearch}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </form>
                                    {isSearched ? <Redirect to={userSearchUrl} /> : <React.Fragment />}

                                </div>
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
            </Hidden>
            <Hidden mdUp>
                <MobileTop style={{ height: 30 }} />
            </Hidden>
            <Hidden mdUp>
                <Box className="bottom-nav" boxShadow={3}>
                    <BottomNav username={username} />
                </Box>
            </Hidden>
        </React.Fragment>

    )
}

export default Header;