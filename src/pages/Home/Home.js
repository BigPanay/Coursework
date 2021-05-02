import React, { useState, useEffect } from "react";
import { useQuery, useApolloClient, gql, useLazyQuery } from "@apollo/client";
import Post from '../../components/post/post';
import Header from "../../components/navigation/header";
import testImage from '../../images/test.jpg';
import testProfile from '../../images/test.jpg';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
// import { GET_USER, GET_USER_SUBSCRIPTION_POST } from '../../graphql/query';
import { Card, CardContent, Hidden, CardActions, Button, Avatar, Typography, Grid, IconButton } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import LoadingCircular from "../../components/loading";
import InfiniteScroll from 'react-infinite-scroll-component';



function Home({username}) {
    const [loading, setLoading] = useState(false);

    let node = {
        node: {
            "test": "test"
        }
    }

    return (
        <div className="main-content">
            <Header username={username} />
            <div className="container mb-c">
                <div className="container-wrap">
                    {loading ? <LoadingCircular />
                        :
                        <Grid container direction="row" className="w-100 h-100 n-marging" spacing={4}>
                            <Hidden smDown>
                                <Grid item xs={4}>
                                    <Card className="b-s-1 m-sidebar" elevation={0}>
                                        <CardContent className="p-0">
                                            <div className="h-sidebar-header dp-bottom-border">
                                                <img className="h-img" src={testImage} alt="Avatar" />
                                            </div>
                                            <div className="h-sidebar-header-user">
                                                <div className="h-sidebar-header-user-img">
                                                    <Avatar alt="Remy Sharp" src={testProfile} className="r-image-border r-avater" />
                                                </div>
                                                <div className="h-sidebar-header-user-det">
                                                    <div className="dp-column">
                                                        <span className="txt-bold">Following</span>
                                                        <span >100</span>
                                                    </div>
                                                    <div className="dp-column">
                                                        <span className="txt-bold">Followers</span>
                                                        <span >100</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-sidebar-header-at">
                                                <Typography variant="h6">{username}</Typography>
                                                <Typography component={NavLink} to={username}>@{username}</Typography>
                                            </div>
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "center" }}>
                                            <NavLink to="/user/new-post">
                                                <IconButton color="primary" size="medium">
                                                    <AddBoxOutlinedIcon />
                                                </IconButton>
                                            </NavLink>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Hidden>
                            <Grid item md={8} xs={12}>
                                <div style={{ marginBottom: 30 }}>
                                    <Post userId="Bigpan" username="BigPan" />
                                </div>
                            </Grid>
                        </Grid>
                    }
                </div>
            </div>
        </div >
    )
}

export default Home;