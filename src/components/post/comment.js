import React, { useEffect, useState } from "react";
import { NavLink, Switch, Redirect } from "react-router-dom";
import { useMutation, useQuery, useApolloClient, gql } from "@apollo/client";
import { Avatar, IconButton } from "@material-ui/core";
import { NEW_LIKE } from '../../graphql/mutations';
import moment from 'moment';
import { FavoriteBorderOutlined, FavoriteOutlined } from "@material-ui/icons";

export default function Comment({ node, userId, postId }) {
  const client = useApolloClient();

  const [comment] = useState(node.node);
  const [dateType, setDateType] = useState('m');
  const [userLiked, setUserLiked] = useState(comment.userLiked);
  // const [totalLikes, setTotalLikes] = useState(comment.total_likes);
  const time = moment(moment().format());

  // const NewLikeInput = {
  //   likeItemId: String(comment.id),
  //   postId: postId,
  //   userId: userId
  // }

  // const [newLike] = useMutation(
  //   NEW_LIKE,
  //   {
  //     variables: { newLike: NewLikeInput }
  //   },
  //   { errorPolicy: "all" }
  // );


  function test() {
    console.log("hello");
  }

  function getDate() {
    if (time.diff(comment.created_at, 'minutes') < 60) {
      return (<span style={{ fontSize: "0.9rem" }}>{time.diff(comment.created_at, 'minutes')}m ago</span>)
    } else if (time.diff(comment.created_at, 'hours') >= 1 && time.diff(comment.created_at, 'hours') <= 24) {
      return (<span style={{ fontSize: "0.9rem" }}>{time.diff(comment.created_at, 'hours')}hr ago</span>)
    } else if (time.diff(comment.created_at, 'days') >= 1 && time.diff(comment.created_at, 'days') <= 30) {
      return (<span style={{ fontSize: "0.9rem" }}>{time.diff(comment.created_at, 'days')}day ago</span>)
    }
  }

  const updateTotalLikes = (count, state) => {
    client.writeFragment({
      id: `Comment:${String(comment.id)}`,
      fragment: gql`
        fragment updateTotalLikesForComment on Comment {
            userLiked
            total_likes
        }
        `,
      data: {
        total_likes: comment.total_likes + count,
        userLiked: state
      },
    });
  }

  const userLikedOrDislikedComment = (event) => {
    event.preventDefault();
    console.log("user liked " + userLiked)
    let likes = totalLikes;
    if (userLiked) {
      setUserLiked(false);
      updateTotalLikes(-1, false);
      newLike();
    } else {
      setUserLiked(true);
      updateTotalLikes(1, true);
      newLike();
    }
  }


  return (
    <div className="j-row mt-2">
      <NavLink to={comment.owner.username}>
        {
          comment.owner.profile_pic_url.length < 10 ?
            <Avatar>{comment.owner.username[0].toUpperCase()}</Avatar>
            :
            <Avatar>Image</Avatar>
        }
      </NavLink>
      <div className="w-100 j-row btwn">
        <div className="p-l-1">
          <NavLink to={comment.owner.username}>
            <span style={{ fontWeight: 500 }}>{comment.owner.username}</span>
          </NavLink>
          <span className="txt">{comment.comment}</span>
          <div className="comment-footer j-row" style={{ paddingTop: 5 }}>
            {getDate()}
            <span
              style={{ fontSize: "0.9rem", cursor: "pointer" }}
              className="ml-2"
              onClick={test}
            >
              {comment.total_likes < 1 ? <React.Fragment />
                :
                <span>{comment.total_likes.toLocaleString()} {comment.total_likes > 1 ? "likes" : "like"}</span>
              }
            </span>
          </div>
        </div>
        <div className="comment-like">
          <IconButton size="small" aria-label="likes" onClick={userLikedOrDislikedComment}>
            {userLiked ? <FavoriteOutlined aria-hidden="true" />
              :
              <FavoriteBorderOutlined aria-hidden="true" />
            }
          </IconButton>
        </div>
      </div>
    </div>
  );
}
