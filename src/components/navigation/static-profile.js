import React, { useEffect } from "react";
import { NavLink, Switch } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import socialLinks from "../../utils/socialLinks";
import Logo from '../../images/logo.png';
import testImage from '../../images/logo.png';

function StaticProfile() {
    return (
        <header className="main-header">
            <div className="menu">
                <div className="main-menu menu">
                    <div className="menu-header">
                        <img src={Logo} width="60px" alt="Placeholder image" />
                        <button className="button is-white">
                            {/* <FontAwesomeIcon icon={faBars} style={{ color: "grey" }} className="fas fa-lg" aria-hidden="true" /> */}
                        </button>
                    </div>
                    <div className="menu-profile">
                        <div className="menu-profile-wrapper">
                            <div className="image is-76x76">
                                <img className="r-image" src={testImage} alt="Avatar" />
                            </div>
                            <p>Full name</p>
                            <a href="#">@JohnDoe</a>
                        </div>
                        <div className="menu-profile-sub">
                            <a>3 Following</a>
                            <a>3 Fans</a>
                        </div>
                    </div>
                    <div className="menu-list">
                        {/* <ul>
                            <li><a><FontAwesomeIcon icon={faUser} style={{ color: "grey" }} className="fas fa-lg" aria-hidden="true" style={{ width: "1em" }} /> Profile</a></li>
                            <li><a><FontAwesomeIcon icon={faSearch} style={{ color: "grey" }} className="fas fa-lg" aria-hidden="true" style={{ width: "1em" }} /> Explore Page</a></li>
                        </ul> */}
                    </div>
                    <div className="menu-footer">
                        <button>
                            New Post
                    </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default StaticProfile;
