import React, { useEffect, useState } from 'react';
import testProfile from '../../images/test.jpg';
import { Box, Grid, Typography, Divider, Avatar, FormControl, TextField, Input, Button, Card, CardContent, CardHeader, IconButton, CardActionArea, CardActions } from '@material-ui/core';
import { useParams } from 'react-router';
import moment from 'moment';
import { ExpandMore, AttachFile, EmojiEmotionsOutlined } from '@material-ui/icons';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { NEW_MESSAGE } from '../../graphql/mutations';

export default function Conversation({ username }) {
    const client = useApolloClient();
    const [userMessage, setUserMessage] = useState("");

    let { conversationId } = useParams();

    const conversationData = client.readFragment({
        id: "Conversations:" + conversationId,
        fragment: gql`
            fragment conversation on Conversations {
                id
                readAt
                users
                messages {
                    message
                    createdAt
                    senderId
                    mediaUrls
                }
            }
        `
    });

    let prevMessage;
    let userMessages;
    userMessages = [...conversationData.messages];

    const NewMessageInput = {
        senderId: username,
        recieverId: "bigpan",
        message: userMessage,
        mediaUrls: "none"
    }

    const [newMessage, { error, data }] = useMutation(
        NEW_MESSAGE,
        {
            variables: { newMessage: NewMessageInput }
        },
        { errorPolicy: "all" }
    )

    const submitNewMessage = (event) => {
        event.preventDefault();
        newMessage();
        client.writeFragment({
            id: "Conversations:" + conversationId,
            fragment: gql`
            fragment conversation on Conversations {
                messages
            }
        `,
            data: {
                messages: [
                    {
                        message: userMessage,
                        senderId: username,
                        mediaUrls: "none",
                        createdAt: moment().format(),
                        __typename: "Message"
                    },
                    ...conversationData.messages,
                ]
            }
        });

        setUserMessage("");
    }

    const onUserMessageChange = (event) => {
        setUserMessage(event.target.value);
    }
    //

    const getUsersName = () => {
        let index = conversationData.users.indexOf(username.toLowerCase());
        return index == 0 ? conversationData.users[1] : conversationData.users[0];
    }

    function senderMessage(message, index, minutes) {
        let isMinutesGreaterThanTwo = minutes > 2 || minutes == -1;
        let rightMargin = isMinutesGreaterThanTwo ? 'none' : 40;
        let topPadding = isMinutesGreaterThanTwo ? 20 : 0;
        return (
            <Grid item xs={12} key={index}>
                <div className="j-row" style={{ marginLeft: 100, marginRight: rightMargin, paddingTop: topPadding }}>
                    <div className="chat-r">
                        <div className="chat-r-msg">
                            <Typography className="p-1">{message.message}</Typography>
                        </div>
                    </div>
                    <div>
                        {isMinutesGreaterThanTwo ? <Avatar aria-label="recipe" src={testProfile} /> : <React.Fragment />}
                        <Typography align="right">{isMinutesGreaterThanTwo ? moment(message.createdAt).format("HH:mm") : " "}</Typography>
                    </div>
                </div>
            </Grid>
        )
    }

    function recieverMessage(message, index, minutes) {
        let isMinutesGreaterThanTwo = minutes > 2 || minutes == -1;

        let leftMarging = isMinutesGreaterThanTwo ? 'none' : 40;
        let topPadding = isMinutesGreaterThanTwo ? 20 : 0;
        return (
            <Grid item xs={12} key={index}>
                <div className="j-row" style={{ marginRight: 100, marginLeft: leftMarging, paddingTop: topPadding }}>
                    <div>
                        {isMinutesGreaterThanTwo ? <Avatar aria-label="recipe" src={testProfile} /> : <React.Fragment />}
                        <Typography align="right">{isMinutesGreaterThanTwo ? moment(message.createdAt).format("HH:mm") : " "}</Typography>
                    </div>
                    <div>
                        <div className="chat">
                            <Typography className="p-1"> {message.message}</Typography>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }

    function returnMessages(message, index) {
        // console.log("Dilan " + moment().calendar(message.createdAt, {
        //     sameDay: '[Today]',
        //     nextDay: '[Tomorrow]',
        //     nextWeek: 'dddd',
        //     lastDay: '[Yesterday]',
        //     lastWeek: '[Last] dddd',
        //     sameElse: 'DD/MM/YYYY'
        // }));
        // console.log("message " + JSON.stringify(message) + " index: " + index + " prevMessage: " + JSON.stringify(prevMessage))
        let minutes = -1;
        if (prevMessage != null) {
            if (prevMessage.senderId == message.senderId) {
                minutes = moment(message.createdAt).diff(prevMessage.createdAt, 'minutes');
            }
            // console.log(minutes)
        }

        prevMessage = message;
        if (message.senderId == username.toLowerCase()) {
            return senderMessage(message, index, minutes);
        } else {
            return recieverMessage(message, index, minutes);
        }
    }

    return (
        <Card className="b-s-1" elevation={0}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={testProfile} style={{ height: "50px", width: "50px" }} />
                }
                action={
                    <IconButton aria-label="settings">
                        <ExpandMore />
                    </IconButton>
                }
                title={getUsersName()}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={0} direction="row">
                    {userMessages.reverse().map((message, index) => {
                        return returnMessages(message, index)
                    })}

                </Grid>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={10}>
                        <FormControl fullWidth >
                            <TextField id="outlined-basic" label="Outlined" value={userMessage} onChange={onUserMessageChange} />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={submitNewMessage}>
                            <AttachFile />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <EmojiEmotionsOutlined />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}