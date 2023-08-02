import { Dialog, Paper, List, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";

import {
    StyledDialogContent,
    EditRideNotesDialogContainer,
    IconBox,
    InputBox,
    Label,
    SaveButton,
    EditRideNotesStyles,
    CloseEditRideNotesIcon,
    InputTextField,
} from "./EditRideNotesDialogStyle";

import { gql, useMutation } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv.js";

export default function EditRideNotesDialog(props) {

    const UPDATE_RIDE_NOTES = gql`
        mutation UpdateRideNote($id: MongoID!, $notes: String!){
            rideUpdateOne(filter: { _id: $id }, record: {notes: $notes}){
            record {
                notes
            }
        }
    }
    `

    const { addToast } = useToasts();
    const { openDialog, setOpenDialog, rideSummary } = props;
    const [changesMade, setChangesMade] = useState(false);

    const [ride, setRide] = useState({
        "notes": rideSummary.notes
    });

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const [updateRideNotes, {data, loading, error}] = useMutation(UPDATE_RIDE_NOTES); 

    // const updateRideInfo = () => {
    //     updateRideNotes({variables: ride});
    // };

    function updateRide () {
        return updateRideNotes({
            variables: {
                id: rideSummary._id,
                notes: ride["notes"],
            }
        })
    }

    function updateNote(value) {
        ride["notes"] = value;
    }

    const clearTextField = () => {
        ride["notes"] = "";
    };

    if (loading) return <LoadingDiv />;
    if (error) return `Error! ${error.message}`;

    return (
        <Dialog open={openDialog} fullWidth={true} maxWidth="x1">
            <Paper style={{maxHeight: 700, overflow: "auto"}}>
                <StyledDialogContent>
                    <EditRideNotesDialogContainer>
                        <IconBox>
                            <CloseEditRideNotesIcon onClick={closeDialog}/>
                        </IconBox>

                        <InputBox>
                            <Label>Ride Note:</Label>
                            <InputTextField
                                label="Ride Note"
                                defaultValue={rideSummary.notes}
                                name="ridenote"
                                onChange={(e) => {
                                    updateNote(e.target.value);
                                    setChangesMade(true);
                                }}
                                clearTextField={() => {
                                    clearTextField("ridenote");
                                    setChangesMade(true);
                                }}
                            >
                            </InputTextField>
                        </InputBox>

                        <SaveButton
                            variant="contained"
                            onClick={() => {
                                if (changesMade) {
                                    updateRide();
                                    window.location.reload();
                                }
                                setOpenDialog(false);
                                addToast("Notes Updated", {
                                    appearance: "success",
                                });
                            }}
                            >
                            Save
                        </SaveButton>
                    </EditRideNotesDialogContainer>
                </StyledDialogContent>
            </Paper>
        </Dialog>
    )
}