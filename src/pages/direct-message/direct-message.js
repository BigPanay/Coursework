import React, { useEffect, useState } from 'react';
import testImage from '../../images/test.jpg';
import testProfile from '../../images/test.jpg';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button, Card, CardContent, CardHeader, IconButton, CardActionArea, CardActions, Badge } from '@material-ui/core';
import Header from '../../components/navigation/header';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { DM_SUBSCRIPTION } from '../../graphql/mutations';
import Conversation from './conversation';
import { GET_CONVERSATIONS } from '../../graphql/query';
import LoadingCircular from '../../components/loading';
import moment from 'moment';

export default function DirectMessage({ username }) {
    const history = useHistory();
    const { data: subsData, loading: subsLoading } = useSubscription(DM_SUBSCRIPTION);

    const { data, loading } = useQuery(GET_CONVERSATIONS, {
        variables: { username },
    });

    const getUsersName = (conversation) => {
        let index = conversation.users.indexOf(username.toLowerCase());
        return index == 0 ? conversation.users[1] : conversation.users[0];
    }

    function returnConversationIndex(conversationId) {
        history.push(`/message/${conversationId}`);
    }

    console.log(subsData);


    return (
        <div className="main-content">
            <Header username={username} />
            <div className="container mb-c">
                <div className="container-wrap">
                    {loading ?
                        <LoadingCircular />
                        :
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs={12} md={3}>
                                <Card className="b-s-1" elevation={0}>
                                    <CardContent>
                                        <Grid container direction={"column"} spacing={2}>
                                            <Grid item>
                                                <Typography>test</Typography>
                                            </Grid>
                                            <Divider />
                                            {data.getUserConversations.map((conversation, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <div className="j-row w-100 h-100">
                                                            <NavLink to="/dilanwizzy">
                                                                <div style={{ height: 45, width: 45 }} className="ml-1">
                                                                    <Avatar alt="Remy Sharp" src={testProfile} className="w-100 h-100" />
                                                                </div>
                                                            </NavLink>
                                                            <div className="ml-1 w-100 " style={{ cursor: 'pointer' }} onClick={() => {
                                                                returnConversationIndex(conversation.id)
                                                            }}>
                                                                <Typography>{getUsersName(conversation)}</Typography>
                                                                <Typography className="cut-text">{conversation.messages[0].message}</Typography>
                                                            </div>
                                                            <div style={{ textAlign: 'center' }}>
                                                                <Typography>{moment(conversation.messages[0].createdAt).format("HH:mm")}</Typography>
                                                                <Badge badgeContent={1} color="primary">
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        <Divider />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Switch>
                                    <Route exact path="/message/:conversationId"> <Conversation username={username} /> </Route>
                                </Switch>
                            </Grid>
                        </Grid>
                    }

                </div>
            </div>
        </div>
    )
}