import * as React from "react";
import { useHistory, Link } from "react-router-dom";

import { Typography, Grid, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import UserProfileMap from "../components/UserProfileMap";
import { UserContext } from "../contexts/user/UserContextProvider";
import ChefSignUp from "../components/ChefSignUp";
import Main from "../components/Main";

const useStyles = makeStyles((theme) => ({
    profile: {
        // overflow: "hidden",
        width: "100%",
        maxWidth: "800px",
        height: "40vh",
    },
    profileTopRight: {},
    profileTopLeft: {
        textAlign: "center",
    },

    userImage: {
        margin: "auto",
        border: "5px solid white",
        height: "100px",
        width: "100px",
    },

    sendMessageBtn: {
        textTransform: "capitalize",
        padding: "10px",
    },
    editButton: {
        color: "white",
        background: "#FF743D",
        maxHeight: "2rem",
        maxWidth: "2rem",
    },
    chefButton: {
        padding: "10px",
    },
    box: {
        padding: ".6rem",
        fontSize: ".7rem",
        fontWeight: "600",
        color: "#ffff",
        background: theme.background.secondary,
    },
    link: {
        color: "#FF743D",
        textDecoration: "none",
        fontSize: "0.7rem",
    },

    map: {
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "40vh",
    },
}));

export default function UserProfile() {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const { profile } = user;
    profile.chefProfile = { ...profile.chefProfile };

    // populate user data using profile from context
    const userData = {
        name: user.profile.firstName + " " + user.profile.lastName,
        location:
            user.profile.primaryAddress.city +
            ", " +
            user.profile.primaryAddress.region +
            ", " +
            user.profile.primaryAddress.country,
        about: user.profile.bio,
        cuisine: user.profile.favoriteCuisine,
    };

    return (
        <Main>
            <Box
                component={Grid}
                boxShadow={3}
                container
                spacing={4}
                className={classes.profile}
            >
                <Grid
                    item
                    xs={6}
                    container
                    spacing={1}
                    className={classes.profileTopLeft}
                >
                    <Grid item xs={12}>
                        <Box
                            boxShadow={2}
                            component={Avatar}
                            src={user.profile.profilePicURL}
                            alt={user.profile.profilePicURL ? "Profile Image" : ""}
                            className={classes.userImage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h2">
                            {userData.name}
                        </Typography>
                        <Typography variant="body2" component="h3">
                            {userData.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {user.profile.chefProfile.cuisineSpecialty &&
                            user.profile.chefProfile.cuisineSpecialty.map(
                                (specialty) => (
                                    <Button
                                        key={specialty}
                                        className={classes.box}
                                        color="primary"
                                        variant="contained"
                                    >
                                        {specialty}
                                    </Button>
                                )
                            )}
                    </Grid>
                    <Grid item xs={12}>
                        {!user.profile.isChef ? (
                            <ChefSignUp />
                        ) : (
                            <div>
                                <Button
                                    className={classes.chefButton}
                                    variant="outlined"
                                    color="primary"
                                >
                                    <Link
                                        className={classes.link}
                                        to={`chefprofile/${profile.chefProfile._id}`}
                                    >
                                        Edit Menu
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={6}
                    container
                    spacing={0}
                    className={classes.profileTopRight}
                >
                    <Grid item xs={12}>
                        <Button
                            className={classes.chefButton}
                            variant="outlined"
                            color="primary"
                        >
                            <Link className={classes.link} to={"/editprofile"}>
                                Edit Profile
                            </Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h4">
                            About Me:
                        </Typography>
                        <Typography variant="body2" component="h5">
                            {userData.about}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h4">
                            Favourite Cuisine:
                        </Typography>
                        {userData.cuisine.map((cuisine) => (
                            <Button
                                key={cuisine}
                                className={classes.box}
                                color="primary"
                                variant="contained"
                            >
                                {cuisine}
                            </Button>
                        ))}
                    </Grid>
                </Grid>

                <Box
                    component={UserProfileMap}
                    className={classes.map}
                    location={userData.location}
                    boxShadow={3}
                />
            </Box>
        </Main>
    );
}
