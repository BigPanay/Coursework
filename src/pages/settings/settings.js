import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import Header from "../../components/navigation/header";
import ProfileSettings from "./options/profile";
import SubscriptionsSettings from "./options/subscriptions";
import BillingSettings from './options/billing-information';
import SecuritySettings from './options/security';
import NotificationSettings from './options/notifications';
import { Card, CardContent, Grid, List, Typography, ListItem, ListItemText, Collapse } from '@material-ui/core';
import BillingCardSettings from './options/billing/billing-card';
import BillingPaymentsSettings from './options/billing/billing-payments';

export default function Settings({ username }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    function ListItemLink(props) {
        return <ListItem  button component={NavLink} {...props} style={{ paddingBottom: 14 }} />;
    }

    return (
        <div className="main-content">
            <Header username={username}/>
            <div className="bk-c">
                <section className="bk-p">
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                        <Typography variant="h3" style={{ color: "white" }}>
                            Account Settings
                        </Typography>
                        <Typography variant="h6" style={{ color: "white" }} gutterBottom>
                            Change account information and settings
                        </Typography>
                    </Grid>
                </section>
            </div>
            <div className="container mb-c">
                <div className="settings">
                    <Grid container direction="row" className="w-100 h-100 n-marging" spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Card className="b-s-1" elevation={0}>
                                <CardContent>
                                    <List className="c-list-s">
                                        <ListItemLink className="l-items-s" to="/settings">
                                            Profile
                                        </ListItemLink>
                                        <ListItemLink className="l-items-s" to="/settings/subscriptions">
                                            Subscriptions
                                        </ListItemLink>
                                        <ListItemLink className="l-items-s" to="/settings/notification">
                                            Notifications
                                        </ListItemLink>
                                        <ListItemLink to="/settings/security">
                                            Security
                                        </ListItemLink>

                                        <ListItem button onClick={handleClick}>
                                            <ListItemText primary="Billing Information" />
                                            {/* {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />} */}
                                        </ListItem>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding style={{paddingLeft: 10}}>
                                                <ListItemLink to="/settings/billing/card">
                                                    You Card
                                                </ListItemLink>
                                                <ListItemLink to="/settings/billing/payments">
                                                    Payments
                                                </ListItemLink>
                                                <ListItemLink to="/settings/billing">
                                                    Withdraw
                                                </ListItemLink>
                                            </List>
                                        </Collapse>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={9}>
                            <Card className="b-s-1" elevation={0}>
                                <CardContent>
                                    <Switch>
                                        <Route exact path="/settings"><ProfileSettings username={username}/></Route>
                                        <Route exact path="/settings/subscriptions" ><SubscriptionsSettings /></Route>
                                        <Route exact path="/settings/notification" ><NotificationSettings /></Route>
                                        <Route exact path="/settings/security" ><SecuritySettings /></Route>
                                        <Route exact path="/settings/billing/card" ><BillingCardSettings /></Route>
                                        <Route exact path="/settings/billing/payments" ><BillingPaymentsSettings /></Route>
                                    </Switch>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>

                {/* <div className="m-sidebar">
                    <h2>Settings</h2>
                    <NavLink to="/settings/my-account">
                        <p>Profile</p>
                    </NavLink>
                </div>
                <div>
                    <Switch>
                        <Route path="settings/my-account" ><ProfileSettings /></Route>
                    </Switch>
                </div> */}

            </div>
        </div>
    )
}