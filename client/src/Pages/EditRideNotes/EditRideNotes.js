import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import ProfileDialog from "./ProfileDialog.js";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";


import {
    EditProfileButton,
} from "./EditRideNotesStyle.js";

// ASK: which is the right way to import variable from RideSummary.js???)
import {RideSummary} from '../RideSummary/RideSummary.js';
// const {GET_RIDE} = require('./RideSummary.js');


const EditRideNotes = () => {
    // Authenticate that user is host of ride.
    const userID = localStorage.getItem('netid');
    const hostID = RideSummary.owner.netid;
    if (userID === hostID) {
        // If user is host, give option of edit button.
        // ASK: how to display button?
    }
}
