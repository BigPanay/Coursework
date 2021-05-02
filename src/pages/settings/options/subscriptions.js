import React, { useState } from 'react';
import testImage from '../../../images/test.jpg';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button, IconButton, Checkbox } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

export default function SubscriptionsSettings() {
    const [isThereSubs, setIsThereSubs] = useState(false);
    const [bankProvided, setIsBankProvided] = useState(true);

    return (
        <Box className="p-2">
            <div>
                <Grid container direction="row" spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Subscriptions
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs={3}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>Price</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Dicount</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Is Promotion</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs={3}>
                                <FormControl className="w-100" noValidate autoComplete="off">
                                    <TextField id="outlined-basic" type="text" label="Required*" variant="outlined" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className="w-100" noValidate autoComplete="off">
                                    <TextField id="outlined-basic" type="number" label="Required*" variant="outlined" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl className="w-100" noValidate autoComplete="off">
                                    <TextField id="outlined-basic" label="Optional" variant="outlined" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox color="primary"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    {bankProvided ?
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <IconButton>
                                {/* <FontAwesomeIcon icon={faPlusSquare} /> */}
                            </IconButton>
                        </Grid>
                        :
                        <Grid></Grid>}

                    {!isThereSubs ?
                        <Grid item xs={12}>
                            <Typography variant="h6">You currently do not have any Subscriptions set up</Typography>
                            {bankProvided ? <Button variant="contained" color="primary">Save</Button>
                                :
                                <Typography>You must <NavLink to="/settings/billing/card">Add Bank infomation</NavLink> to be able to set up a Subscription and accept tips from fans</Typography>
                            }
                        </Grid>
                        : <Grid></Grid>}
                </Grid>
            </div>
        </Box>
    )
}