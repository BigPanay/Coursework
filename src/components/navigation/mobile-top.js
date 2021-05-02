import React, { useEffect, useState } from "react";
import { NavLink, Switch, Redirect } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

export default function MobileTop() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/* <FontAwesomeIcon icon={faLongArrowAltLeft}/> */}
                </IconButton>
                <Typography variant="h6">
                    Home
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
