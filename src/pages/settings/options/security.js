import React from 'react';
import testImage from '../../../images/test.jpg';
import { Box, Grid, Typography, Divider, Switch, Checkbox, Button } from '@material-ui/core';


let options = [
    { title: "Show activity status", on: true },
    { title: "Show Location", on: true },
    { title: "Enable comments", on: true },
    { title: "Show Fan Count", on: true },
    { title: "Show Following Count", on: true },
    { title: "Allow to be searched", on: true },
    
    
    // { title: "Renewal", on: true },
    // { title: "Stream Reminder", on: false },
]

export default function SecuritySettings() {

    function templateOptions(option) {
        return (
            <Grid item xs={12} className="ml-3">
                <Grid container direction="row" spacing={7}>
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
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Security
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Two Step Authentication</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={3} className="ml-2">
                            <Grid item xs={9}>
                                <Typography>Authentication App</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Switch color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={3} className="ml-2">
                            <Grid item xs={9}>
                                <Typography>Authentication by SMS</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Switch color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Privacy</Typography>
                    </Grid>
                    {options.map((value, index) => {
                        return templateOptions(value)
                    })}
                    <Grid item xs={12}>
                            <Button size="large" variant="contained" color="primary">Save</Button>
                        </Grid>
                </Grid>
            </div>
        </Box>
    )
}