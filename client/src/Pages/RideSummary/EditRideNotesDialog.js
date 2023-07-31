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
    // const UPDATE_RIDE_NOTES = gql`
    //     mutation UpdateRideNotes($notes: String) {
    //         rideUpdateNote(record: {notes: $notes}) {
    //             record {
    //                 _id
    //                 notes
    //             }
    //         }
    //     }
    // `;
    

    const UPDATE_RIDE_NOTES = gql`
        mutation UpdateRideNote($id: MongoID!, $record: UpdateOneridesInput!){
            rideUpdateOne(filter: { _id: $id }, record: $record){
            recordId
        }
    }
    `

    const { addToast } = useToasts();
    const { openDialog, setOpenDialog, rideSummary } = props;
    const [changesMade, setChangesMade] = useState(false);

    const [ride, setRide] = useState({
        notes: rideSummary.notes
    });

    const closeDialog = () => {
        setOpenDialog(false);
    };

    // const [updateRideNotes] = useMutation(UPDATE_RIDE_NOTES);

    const [updateRideNotes] = useMutation(UPDATE_RIDE_NOTES, {
        variables: {id: ride._id, record: {notes: ride.notes}}
      })
    
    //   useEffect(() => {
    //     if(newOwner.owner._id !== "") {
    //       updateRide().then(result => {
    //         window.location.reload();
    //       }).catch((err) => {
    //         console.log(err)
    //       })
    //     }
        
    //   }, [newOwner, updateRide]) 

    const updateRide = () => {
        updateRideNotes({ variables: ride });
    };

    function updateNote(value) {
        ride["notes"] = value;
    }

    function getNote() {
        console.log(ride["notes"]);
    }

    const clearTextField = () => {
        ride["notes"] = "";
    };

    let {loading, error} = useMutation(UPDATE_RIDE_NOTES, {
        variables: {
            ride,
        },
    });

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
                                defaultValue={ride.notes}   // UNSURE!!!
                                name="ridenote"             // UNSURE!!!
                                onChange={(e) => {
                                    updateNote(e.target.value);
                                    setChangesMade(true);
                                    // getNote();
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
                                // try{
                                    if (changesMade) {
                                        console.log("changes made");
                                        updateRide();
                                    }
                                // } catch(error) {
                                //     console.log("error here");
                                // }
                                
                                // try{
                                    setOpenDialog(false);
                                    addToast("Notes Updated", {
                                        appearance: "success",
                                    });
                                    console.log("Printing note: ");
                                    getNote();
                                // } catch(error) {
                                //     console.log("error here");
                                // }
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