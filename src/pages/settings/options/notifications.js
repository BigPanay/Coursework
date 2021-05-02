import React from 'react';
import testImage from '../../../images/test.jpg';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button, Switch, Checkbox } from '@material-ui/core';



let options = [
    { title: "New Fan", on: true },
    { title: "Direct Message", on: true },
    { title: "Tip", on: true },
    { title: "Renewal", on: true },
    { title: "Stream Reminder", on: false },
]

export default function NotificationSettings() {

    function emailOptions(option) {
        return (
            <Grid item xs={12} className="ml-2">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={9} style={{alignSelf: "center"}}>
                        <Typography>{option.title}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {option.on ? <Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            :
                            <Checkbox color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />}

                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box className="p-2">
            <div>
                <Grid container direction="row" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Notification
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={9}>
                                <Typography variant="h6">Push Notification</Typography>
                                <Typography>Get sent browser Notification</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Switch defaultChecked color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={9}>
                                <Typography variant="h6">Email Notification</Typography>
                                <Typography>Get sent emails to keep up to date on what is happening on your profile</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Switch defaultChecked color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Get emails for</Typography>
                    </Grid>
                    {options.map((value, index) => {
                        return emailOptions(value)
                    })}
                </Grid>
            </div>
        </Box>
    )
}