import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import * as axios from 'axios';

function PrivateRoute({ component: Component, ...rest }) {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [serverStatus, setServerStatus] = useState(null);

    async function validateUser() {
        let value = null;
        try {
            value = await axios({
                url: "/graphql",
                method: 'post',
                data: {
                    query: `
                        query { 
                            authenticateUser {
                                user_id,
                                username
                            }
                        }
                    `
                }
            });
        } catch (err) {
            setServerStatus(false);
            setIsLoaded(true);
            return false;
        }

        if (value.data.data != null) {
            setServerStatus(true);
            setIsLoaded(true);
            setUsername(value.data.data.authenticateUser.username);
            setUserId(value.data.data.authenticateUser.user_id)
            return true
        } else {
            setServerStatus(false);
            setIsLoaded(true);
            return false;
        }
    }

    if (!isLoaded && serverStatus == null) {
        let validate = async () => {
            await validateUser()
        }
        validate();
        return (<React.Fragment />)
    } else {
        return (
            <Route
                {...rest}
                render={props =>
                    serverStatus ? (
                        <Component {...props} username={username} userId={userId} />
                    ) : (
                            <Redirect to="/login" />
                        )
                }
            />
        );
    }

}

export default PrivateRoute;
