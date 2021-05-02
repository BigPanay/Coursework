import { gql } from "@apollo/client";

export const GET_USER = gql`
query getByUsername($username: String!) {
    getByUsername(username: $username) {
        id
        username
        display_name
        first_name
        last_name
        email
        profile_description
        edge_followers {
            totalCount
            edges {
                node {
                    id
                    created_at
                    updated_at
                    times_renewed
                    is_cancelled

                }
            }
        }
        edge_like {
            totalCount
            edges {
                node {
                    id
                }
            }
        }
        info {
            id
            created_at
            account_verified
            is_email_verified
            is_verified
        }
        subscriptions {
            id
            name
            price
            is_discounted
        }
    }
}
`;

export const GET_USER_POST = gql`
query user_post_edge($userId: String!, $first: Float!, $skip: Float!, $after: String, $orderBy: PostOrder) {
    user_post_edge(userId: $userId, first: $first, skip: $skip, after: $after, orderBy: $orderBy) {
        totalCount
        pageInfo {
            endCursor
            hasNextPage
            startCursor
        }
        edges {
            cursor
          node {
            id
            precise_time
            created_at
            total_likes
            viewer_has_liked
            post_description
            medias {
                id
                media_url
            }
            edge_preview_comment {
                totalCount
                edges {
                    node {
                        id
                        comment
                        total_likes
                        precise_time
                        created_at
                        viewer_has_liked
                        owner {
                            id
                            username
                            profile_pic_url
                        }
                    }
                }
            }
            can_comment
            is_pinned
            is_free
            viewers_can_reshare
            owner {
                id
                username
                display_name
                profile_pic_url
            }
        }
      }
    }
}
`

export const GET_USER_SUBSCRIPTION_POST = gql`
query post_edge($userId: String!, $first: Float!, $skip: Float!, $after: String, $orderBy: PostOrder) {
    post_edge(userId: $userId, first: $first, skip: $skip, after: $after, orderBy: $orderBy) {
        totalCount
        pageInfo {
            endCursor
            hasNextPage
            startCursor
        }
        edges {
            cursor
          node {
            id
            precise_time
            created_at
            total_likes
            viewer_has_liked
            post_description
            medias {
                id
                media_url
            }
            edge_preview_comment {
                totalCount
                edges {
                    node {
                        id
                        comment
                        total_likes
                        precise_time
                        created_at
                        viewer_has_liked
                        owner {
                            id
                            username
                            profile_pic_url
                        }
                    }
                }
            }
            can_comment
            is_pinned
            is_free
            viewers_can_reshare
            owner {
                id
                username
                display_name
                profile_pic_url
            }
        }
      }
    }
}
`

export const GET_EXPLORER_POSTS = gql`
query explorer_post_edge($first: Float!, $skip: Float!, $after: String, $orderBy: PostOrder) {
    explorer_post_edge(first: $first, skip: $skip, after: $after, orderBy: $orderBy) {
        totalCount
        pageInfo {
            endCursor
            hasNextPage
            startCursor
        }
        edges {
            cursor
          node {
            id
            precise_time
            created_at
            total_likes
            viewer_has_liked
            post_description
            medias {
                id
                media_url
            }
            edge_preview_comment {
                totalCount
                edges {
                    node {
                        id
                        comment
                        total_likes
                        precise_time
                        created_at
                        viewer_has_liked
                        owner {
                            id
                            username
                            profile_pic_url
                        }
                    }
                }
            }
            can_comment
            is_pinned
            is_free
            viewers_can_reshare
            owner {
                id
                username
                display_name
                profile_pic_url
            }
        }
      }
    }
}
`

export const AUTH_USER = gql`
query authenticateUser { 
    authenticateUser {
        user_id

    }
}
`

export const GET_CONVERSATIONS = gql`
query getUserConversations($username: String!) {
    getUserConversations(username: $username) {
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
}
`
