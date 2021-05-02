import React, { useEffect, useState } from 'react';
import testImage from '../../../images/test.jpg';
import testProfile from '../../../images/test.jpg';
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { GET_USER } from '../../../graphql/query';
import { UPDATE_USER } from '../../../graphql/mutations';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button, } from '@material-ui/core';
import Toast from '../../../components/toast';
import LoadingCircular from '../../../components/loading';

export default function ProfileSettings({ username }) {
    const client = useApolloClient();
    const [state, setState] = useState({});
    const [helperText, setHelperText] = useState("example. https://CreativeCulture/" + username.toLowerCase());

    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { username },
    });

    console.log(data)

    const [userToUpdate, { error: loginError, data: loginData }] = useMutation(
        UPDATE_USER,
        {
            variables: { updateUser: state }
        },
        { errorPolicy: "all" }
    );

    let updateProfileUsername = (event) => {
        setHelperText(`example. https://CreativeCulture/${event.target.value.toLowerCase()}`);
        handleFormValueChange(event);
    }

    const handleFormValueChange = (event) => {
        console.log(event.target)
        let name = event.target.name;
        let value = event.target.value;
        setState({
            ...state,
            id: data.getByUsername.id,
            [name]: value
        });
    }

    const updateUserInfo = (event) => {
        event.preventDefault();
        console.log(state)
        userToUpdate();
        client.writeFragment({

        })

    }


    if (loading) {
        return (<LoadingCircular />)
    } else {
        return (
            <Box className="p-2">
                <form onSubmit={e => {
                    e.preventDefault();
                    userToUpdate()
                }}>
                    <Grid container direction="row" spacing={5}>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Profile
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="dp-bottom-border" style={{ height: 200, width: "100%" }}>
                                <img className="h-img" src={testImage} alt="Avatar" />
                            </div>
                            <div className="usr-header-img">
                                <Avatar alt="Remy Sharp" src={testProfile} className="r-image-border r-avater" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="w-100" noValidate autoComplete="off">
                                <Typography className="form-label">Display Name</Typography>
                                <TextField onChange={handleFormValueChange} name="displayName" id="outlined-basic" label="Optional" variant="outlined" defaultValue={data.getByUsername.display_name} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="w-100" noValidate autoComplete="off">
                                <Typography className="form-label">Username</Typography>
                                <TextField onChange={updateProfileUsername} name="username" id="outlined-basic" label="Required" required defaultValue={data.getByUsername.username} variant="outlined" helperText={helperText} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="w-100" noValidate autoComplete="off">
                                <Typography className="form-label">Email</Typography>
                                <TextField onChange={handleFormValueChange} name="email" id="outlined-basic" type="email" label="Required" required variant="outlined" defaultValue={data.getByUsername.email} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="w-100" noValidate autoComplete="off">
                                <Typography className="form-label">Bio</Typography>
                                <TextField onChange={handleFormValueChange} name="profileDescription" label="Optional" multiline variant="outlined" rows={4} defaultValue={data.getByUsername.profile_description} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button size="large" variant="contained" type="submit" color="primary">Save</Button>
                        </Grid>
                    </Grid>
                </form>
                {loginData ? <Toast type="success" message="Sucessfully updated user info" /> : <React.Fragment />}
            </Box>
        )
    }
}

