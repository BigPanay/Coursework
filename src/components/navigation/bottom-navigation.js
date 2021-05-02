import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { EmailOutlined, NotificationsOutlined, ExploreOutlined, PersonOutlineOutlined, HomeOutlined, SearchOutlined } from '@material-ui/icons';
import { Botton, BottomNavigation, BottomNavigationAction, IconButton, Badge, Menu, MenuItem } from '@material-ui/core';

export default function BottomNav({username}) {
    const [value, setValue] = useState('recents');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} style={{ width: 'auto', height: 'auto', backgroundColor: "white" }}>
            <BottomNavigationAction label="Recents" value="recents" icon={
                <NavLink to="/notifications">
                    {/* <Badge badgeContent={1} color="primary"> */}
                    <NotificationsOutlined />
                    {/* </Badge> */}
                </NavLink>
            } />

            <BottomNavigationAction label="Explore" value="Explore" icon={
                <NavLink to="/explore" >
                    <ExploreOutlined />
                </NavLink>
            } />
            <BottomNavigationAction label="Explore" value="Explore" icon={
                <NavLink to="/Search" >
                    <SearchOutlined />
                </NavLink>
            } />
            <BottomNavigationAction label="Messages" value="Messages" icon={
                <NavLink to="/message" >
                    <EmailOutlined />
                </NavLink>
            } />
            <BottomNavigationAction label="Profile" value="Profile" onClick={handleClick} icon={
                <PersonOutlineOutlined />
            } />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to={() => "/" + username} > Profile </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

            {/* <BottomNavigationAction label="Recents" value="recents" icon={
                <NavLink to="/">
                    <IconButton
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <Badge badgeContent={1} color="primary">
                            <NotificationsOutlined />
                        </Badge>
                    </IconButton>
                </NavLink>} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={
                <IconButton
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="primary"
                >
                    <ExploreOutlined />
                </IconButton>} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<SearchOutlined />} />
            <BottomNavigationAction label="Folder" value="folder" icon={
                <IconButton
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="primary"
                >
                    <Badge badgeContent={4} color="primary">
                        <EmailOutlined />
                    </Badge>
                </IconButton>
            } />
            <BottomNavigationAction label="Profile" value="Profile" icon={
                <IconButton
                    aria-label="account of current user"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color="primary"
                    onClick={handleClick}
                >
                    <PersonOutlineOutlined />
                </IconButton>

            } />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}
        </BottomNavigation>
    )
}

