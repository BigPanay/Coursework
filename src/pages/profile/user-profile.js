import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/header";
import Post from '../../components/post/post';
import testImage from '../../images/test.jpg';
import testProfile from '../../images/test.jpg';
import { LocationOnOutlined, EventOutlined } from '@material-ui/icons';
// import UserTabs from '../../components/tabs/user-tabs';
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER, GET_USER_POST } from '../../graphql/query';
import { Button, Avatar, Grid, Badge, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { NavLink, Redirect, useParams } from "react-router-dom";
import LoadingCircular from "../../components/loading";
import moment from "moment";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        height: '12px',
        minWidth: '12px',
        boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 2s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }))(Tooltip);

export default function UserProfile({ username, userId }) {
    let { user } = useParams();

    const { loading, error, data } = useQuery(GET_USER, {
        fetchPolicy: 'no-cache',
        variables: { username: user },
    });

    const verifyUser = () => {
        if (username != null) {
            return username.toLowerCase() == user.toLowerCase();
        } else {
            return false;
        }
    }

    // if (error) {
    //     return (<Redirect to="/not-found/user" />)
    // } else {
    return (
        <div className="main-content">
            {
                verifyUser() ?
                    <Header username={username} />
                    :
                    <React.Fragment></React.Fragment>
            }
            <div className="container mb-c">
                <div className="container-wrap">
                    {loading ?
                        <LoadingCircular />
                        :
                        <Grid container direction="column" className="w-100 h-100" spacing={0} alignItems="center">
                            <Grid item xs={12} md={9}>
                                <div className="usr-main-img dp-bottom-border b-s-2">
                                    <img className="h-img" src={testImage} alt="Avatar" aria-label="Profile Image" />
                                </div>
                                <div className="j-row w-100">
                                    <div className="usr-header-img">
                                        <LightTooltip placement="right-end" title="Online">
                                            <StyledBadge badgeContent=""
                                                aria-label="status"
                                                overlap="circle"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}>
                                                <Avatar alt={data.getByUsername.username} src={testProfile} className="r-image-border r-avater" />

                                            </StyledBadge>
                                        </LightTooltip>

                                    </div>
                                    {verifyUser() ?
                                        <div className="usr-header-det">
                                            <div className="p-r-1 flex-center">
                                                <Button color="primary" variant="contained" className="rounded-c p-r-1">
                                                    New Post
                                                    </Button>
                                            </div>
                                            <div>
                                                <NavLink to="/settings">
                                                    <Button color="primary" variant="outlined" className="rounded-c">
                                                        Edit Profile
                                                    </Button>
                                                </NavLink>

                                            </div>
                                        </div> :
                                        <React.Fragment />
                                    }
                                </div>
                                <div className="usr-header-at w-100 j-column">
                                    <div>{data.getByUsername.display_name}</div>
                                    <a>@{data.getByUsername.username}</a>
                                </div>
                                <div className="j-row w-100 usr-header-at">
                                    <div className="p-r-1" style={{ display: "flex", alignItems: "flex-end" }}>
                                        <span className="icon">
                                            <EventOutlined />
                                        </span>
                                        <span>Creator Since {moment(data.getByUsername.info.created_at).format("MMMM, YYYY")}</span>
                                    </div>
                                </div>
                                <div className="j-row w-100 usr-header-at">
                                    <div className="p-r-1 row">

                                        <a className="txt-bold a-dec">{data.getByUsername.edge_like.totalCount.toLocaleString()} {data.getByUsername.edge_like.totalCount > 1 ? "likes" : "like"}</a>
                                    </div>
                                    <div className="p-r-1 row">
                                        <a className="txt-bold a-dec">1 Following</a>
                                    </div>
                                    <div className="p-r-1 row">
                                        <a className="txt-bold a-dec">{data.getByUsername.edge_followers.totalCount.toLocaleString()} {data.getByUsername.edge_followers.totalCount > 1 ? "Fans" : "Fan"}</a>
                                    </div>
                                </div>
                                <div className="w-100 p-2">
                                    <span>{data.getByUsername.profile_description}</span>
                                </div>
                            </Grid>
                            {
                                !data ? <React.Fragment />
                                    :
                                    <Grid item xs={12} md={9}>
                                        {/* <UserTabs userId={userId} userToSearchId={data.getByUsername.id} /> */}
                                    </Grid>
                            }

                        </Grid>
                    }
                </div>
            </div>
        </div>
    )
    // }
}
