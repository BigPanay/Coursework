import React from 'react';
import testImage from '../../../images/test.jpg';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button } from '@material-ui/core';


export default function BillingSettings() {

    return (
        <Box className="p-2">
            <div>
                <Grid container direction="row" spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Billing Information
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}