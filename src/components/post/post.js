import React, { useState } from 'react';
import { useMutation, useQuery, useApolloClient, gql } from "@apollo/client";
import { ExpandMoreOutlined, FavoriteBorderOutlined, FavoriteOutlined, ChatBubbleOutline, BookmarkBorderOutlined, NearMeOutlined } from '@material-ui/icons';
import { NEW_COMMENT, NEW_LIKE } from '../../graphql/mutations';
import testImage from '../../images/test.jpg';
import testProfile from '../../images/test.jpg';
import { Card, CardHeader, IconButton, Avatar, CardMedia, CardContent, CardActions, TextareaAutosize, FormControl, CardActionArea, TextField, Menu, MenuItem } from '@material-ui/core';
import Comment from './comment';
import { NavLink, Redirect } from 'react-router-dom';
import moment from 'moment';

function Post({username, userId }) {
    // const [post] = useState(node.node);
    const [postAnchorEl, setPostAnchorEl] = useState(null);
    const client = useApolloClient();

    // const postData = client.readFragment({
    //     id: 'Post:' + post.id, // The value of the to-do item's unique identifier
    //     fragment: gql`
    //       fragment post on Post {
    //         id
    //         total_likes
    //         viewer_has_liked
    //       }
    //     `,
    // });

    // const [comment, setComment] = useState("");
    // const [newCommentId, setNewCommentId] = useState(100);

    // const NewCommentInput = {
    //     comment: comment,
    //     postId: post.id,
    //     userId: userId,
    // }

    // const NewLikeInput = {
    //     likeItemId: post.id,
    //     postId: post.id,
    //     userId: userId
    // }

    // const [newComment, { error, data }] = useMutation(
    //     NEW_COMMENT,
    //     {
    //         variables: { newComment: NewCommentInput }
    //     },
    //     { errorPolicy: "all" }
    // );

    // const [newLike] = useMutation(
    //     NEW_LIKE,
    //     {
    //         variables: { newLike: NewLikeInput }
    //     },
    //     { errorPolicy: "all" }
    // );

    const onValueChange = (event) => {
        setComment(event.target.value);
    }

    // const submitNewComment = (event) => {
    //     event.preventDefault();
    //     // newComment();
    //     setNewCommentId(newCommentId + 1);
    //     client.writeFragment({
    //         id: 'Post:' + post.id,
    //         fragment: gql`
    //               fragment updatePost on Post {
    //                 edge_preview_comment
    //               }
    //             `,
    //         data: {
    //             totalCount: post.edge_preview_comment.totalCount + 1,
    //             // comments: [
    //             //     ...post.edge_preview_comment.edges, {
    //             //         id: newCommentId,
    //             //         comment: comment,
    //             //         total_likes: 0,
    //             //         viewer_has_liked: false,
    //             //         precise_time: moment().format(),
    //             //         owner: {
    //             //             username: username,
    //             //             profile_pic_url: "none",
    //             //             __typename: "User"
    //             //         },
    //             //         __typename: "Comment"
    //             //     }
    //             // ]
    //         },
    //     });
    //     setComment("");

    // }

    // const updateTotalLikes = (count) => {
    //     client.writeFragment({
    //         id: 'Post:' + post.id,
    //         fragment: gql`
    //         fragment updateTotalLikes on Post {
    //             viewer_has_liked
    //             total_likes
    //         }
    //         `,
    //         data: {
    //             total_likes: postData.total_likes + count,
    //             viewer_has_liked: !postData.viewer_has_liked
    //         },
    //     });
    // }

    // const userLikedOrDislikedPost = (event) => {
    //     event.preventDefault();
    //     if (postData.viewer_has_liked) {
    //         updateTotalLikes(-1)
    //         newLike();
    //     } else {
    //         updateTotalLikes(1)
    //         newLike();
    //     }
    // }

    const handleExpandClick = (event) => {
        setPostAnchorEl(event.currentTarget);
    }

    const handleExpandClose = (event) => {
        setPostAnchorEl(null);
    }

    const copyToClipboard = () => {
        
    }

    return (
        <Card className="b-s-1" elevation={0}>
            <CardHeader
                avatar={
                    <Avatar aria-label="bigpan" src={testProfile} />
                }
                action={
                    <IconButton aria-label="settings" aria-controls="post-settings" onClick={handleExpandClick}>
                        <ExpandMoreOutlined aria-hidden="true" />
                    </IconButton>
                }
                title="BigPan"
                subheader={2020}
            />
            <Menu
                elevation={0}
                id="post-settings"
                anchorEl={postAnchorEl}
                keepMounted
                open={Boolean(postAnchorEl)}
                onClose={handleExpandClose}
            >
                <MenuItem onClick={handleExpandClose}>Copy URL</MenuItem>
                <MenuItem><NavLink to={() => { return "/post/"}} style={{ color: "inherit", fontWeight: "inherit" }}>View Post </NavLink></MenuItem>
                <MenuItem onClick={handleExpandClose} style={{ color: "red !important" }}>Report Post</MenuItem>
            </Menu>
            <CardActionArea>
                <CardMedia
                    style={{ paddingTop: "80%", height: 0 }}
                    image={testImage}
                    title="BigPan"
                />
            </CardActionArea>
            <CardContent>
                <div className="j-column">
                    <div className="j-row">
                        <div className="c-h-left">
                            <IconButton aria-label="likes" onClick={() => {console.log("i like this")}}>
                                {/* {postData.viewer_has_liked ? <FavoriteOutlined aria-hidden="true" />
                                    :
                                    <FavoriteBorderOutlined aria-hidden="true" />
                                } */}
                            </IconButton>
                            <IconButton aria-label="likes">
                                <ChatBubbleOutline aria-hidden="true" />
                            </IconButton>
                        </div>
                        <div className="c-h-right">
                            <IconButton aria-label="favourite">
                                <BookmarkBorderOutlined aria-hidden="true" />
                            </IconButton>
                        </div>
                    </div>
                    <div className="c-h-left" style={{ padding: "5px 10px" }}>
                        {/* {postData.total_likes < 1 ? <React.Fragment />
                            :
                            <span>{postData.total_likes.toLocaleString()} {postData.total_likes > 1 ? "likes" : "like"}</span>
                        } */}
                        <span>12</span>

                    </div>
                    <div className="j-column">
                        <div className="j-column post-media-content p-1">
                            <span className="title m-b-1">BigPan</span>
                            <NavLink to="BigPan">@BigPan</NavLink>
                        </div>
                        <Avatar aria-label="avater" src={testProfile} style={{ width: 56, height: 56 }} />
                    </div>
                    <div className="post-content-comment p-l-1">
                        <span>Spider-man Into The Spiderverse</span>
                    </div>
                    <div>
                        {/* {post.edge_preview_comment.edges.map((node, index) => {
                            return (
                                <div className="mb-1" key={index}>
                                    <Comment node={node} userId={userId} postId={post.id} />
                                </div>
                            )
                        })} */}
                    </div>
                    <div className="p-b-1">
                        <NavLink className="p-comments" to={() => { return "/post/"}}>View 10 comments</NavLink>
                    </div>
                </div>
            </CardContent>
            <CardActions className="card-footer">
                <FormControl className="w-100">
                    <TextareaAutosize onChange={onValueChange} value="comment" style={{ resize: "none", border: "none" }} name="comment" rowsMin={2} aria-label="comment textarea" placeholder="Comment" />
                </FormControl>
                <IconButton aria-label="settings" onClick={() => {console.log("settings")}}>
                    <NearMeOutlined />
                </IconButton>

            </CardActions>
        </Card>
    )

}

export default Post;

