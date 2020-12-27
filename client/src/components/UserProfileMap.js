import React from "react";
import Grid from "@material-ui/core/Grid";

export default function UserProfileMap({ className, location }) {
    const backgroundImage = `url(/maps/static?center=${encodeURIComponent(
        location
    )})`;
    return <Grid className={className} item xs={12} style={{ backgroundImage }} />;
}
