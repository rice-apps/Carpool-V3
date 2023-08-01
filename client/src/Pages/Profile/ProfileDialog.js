import { Dialog, Paper, List, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
    ProfileDialogContainer,
    IconBox,
    ProfileIcon,
    //  ProfileEditIcon,
    CloseProfileIcon,
    Label,
    VenmoTextField,
    RequiredTextField,
    InputBox,
    SaveButton,
    StyledDialogContent,
    CollegeSelect,
    ProfileStyles,
    CarBrandTextField,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";

export default function ProfileDialog(props) {
    const UPDATE_USER = gql`
        mutation UpdateUser(
            $firstName: String!
            $lastName: String!
            $college: String!
            $phone: String!
            $venmo: String!
            $carId: MongoID!
        ) {
            userUpdateOne(
                record: {
                    firstName: $firstName
                    lastName: $lastName
                    college: $college
                    phone: $phone
                    venmo: $venmo
                    personalCar: $carId
                }
            ) {
                record {
                    _id
                    firstName
                    lastName
                    college
                    phone
                    venmo
                }
            }
        }
    `;

    const CREATE_CAR = gql`
        mutation CreateCar(
            $carBrand: String!
            $carColor: String!
            $carType: String!
            $licensePlate: String!
        ) {
            carCreateOne(
                record: {
                    carBrand: $carBrand
                    carColor: $carColor
                    carType: $carType
                    licensePlate: $licensePlate
                }
            ) {
                record {
                    _id
                }
            }
        }
    `;

    const { addToast } = useToasts();
    const { openDialog, setOpenDialog, profileUser } = props;
    const [changesMade, setChangesMade] = useState(false);

    const [user, setUser] = useState({
        firstName: profileUser.firstName,
        lastName: profileUser.lastName,
        college: profileUser.college,
        phone: profileUser.phone,
        email: profileUser.netid + "@rice.edu",
        venmo: profileUser.venmo,
        carColor: profileUser.carColor,
        carBrand: profileUser.carBrand,
        carType: profileUser.carType,
        licensePlate: profileUser.licensePlate,
        carId: profileUser.carId,
    });

    const closeDialog = () => {
        setOpenDialog(false);
    };

    function selectCollege(e) {
        const newCollege = e.target.value;
        setUserProps("college", newCollege);
    }

    const classes = ProfileStyles();

    function setCollege(e) {
        const newCollege = e.target.value;
        setUser((prestate) => {
            return {
                ...prestate,
                college: newCollege,
            };
        });
    }
    //new functions for car types
    function selectCarColor(e) {
        const newCarColor = e.target.value;
        setUserProps("carColor", newCarColor);
    }
    function setCarColor(e) {
        const newCarColor = e.target.value;
        setUser((prestate) => {
            return {
                ...prestate,
                carColor: newCarColor,
            };
        });
    }

    function selectCarType(e) {
        const newCarType = e.target.value;
        setUserProps("carType", newCarType);
    }

    function setCarType(e) {
        const newCarType = e.target.value;
        setUser((prestate) => {
            return {
                ...prestate,
                carType: newCarType,
            };
        });
    }

    function setCarId(newCarId) {
        setUser((prestate) => {
            return {
                ...prestate,
                carId: newCarId,
            };
        });
    }

    const [updateUser] = useMutation(UPDATE_USER);
    const [createCar] = useMutation(CREATE_CAR);

    const updateUserInfo = async () => {
        const carId = await updateCarInfo();
        setUserProps("carId", carId);
        updateUser({ variables: user }).catch((error) => {
            addToast("Error updating user!");
        });
    };

    const updateCarInfo = async () => {
        let carId;
        await createCar({ variables: user })
            .then((obj) => {
                carId = obj.data.carCreateOne.record._id;
            })
            .catch((error) => {
                addToast(
                    "Sorry, an error occurred updating your personal car information."
                );
            });
        return carId;
    };

    function setUserProps(key, value) {
        user[key] = value;
    }

    const clearTextField = (key) => {
        setUserProps(key, "");
        document.getElementsByName(key)[0].value = "";
    };

    let { loading, error } = useMutation(UPDATE_USER, {
        variables: {
            user,
        },
    });

    if (loading) return <LoadingDiv />;
    if (error) return `Error! ${error.message}`;

    return (
        <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
            <Paper style={{ maxHeight: 700, overflow: "auto" }}>
                <List>
                    <StyledDialogContent>
                        <ProfileDialogContainer>
                            <IconBox>
                                <ProfileIcon />
                                {/* <ProfileEditIcon /> */}
                                <CloseProfileIcon onClick={closeDialog} />
                            </IconBox>

                            <InputBox>
                                <Label>Name:</Label>
                                <RequiredTextField
                                    label="First Name"
                                    defaultValue={user.firstName}
                                    name="firstName"
                                    required
                                    onChange={(e) => {
                                        setUserProps(
                                            "firstName",
                                            e.target.value
                                        );
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("firstName");
                                        setChangesMade(true);
                                    }}
                                ></RequiredTextField>
                                <RequiredTextField
                                    label="Last Name"
                                    name="lastName"
                                    defaultValue={user.lastName}
                                    required
                                    onChange={(e) => {
                                        setUserProps(
                                            "lastName",
                                            e.target.value
                                        );
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("lastName");
                                        setChangesMade(true);
                                    }}
                                ></RequiredTextField>

                                <Label>College:</Label>
                                <CollegeSelect
                                    variant="outlined"
                                    margin="dense"
                                    defaultValue={user.college}
                                    classes={{ root: classes.inputLabelProps }}
                                    onChange={(e) => {
                                        selectCollege(e);
                                        setCollege(e);
                                        setChangesMade(true);
                                    }}
                                >
                                    <MenuItem value="Baker">Baker</MenuItem>
                                    <MenuItem value="Will Rice">
                                        Will Rice
                                    </MenuItem>
                                    <MenuItem value="Hanszen">Hanszen</MenuItem>
                                    <MenuItem value="Wiess">Wiess</MenuItem>
                                    <MenuItem value="Jones">Jones</MenuItem>
                                    <MenuItem value="Brown">Brown</MenuItem>
                                    <MenuItem value="Lovett">Lovett</MenuItem>
                                    <MenuItem value="Sid Rich">
                                        Sid Rich
                                    </MenuItem>
                                    <MenuItem value="Martel">Martel</MenuItem>
                                    <MenuItem value="McMurtry">
                                        McMurtry
                                    </MenuItem>
                                    <MenuItem value="Duncan">Duncan</MenuItem>
                                </CollegeSelect>

                                <Label>Contact:</Label>
                                <RequiredTextField
                                    label="Phone #"
                                    defaultValue={user.phone}
                                    name="phone"
                                    required
                                    onChange={(e) => {
                                        setUserProps("phone", e.target.value);
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("phone");
                                        setChangesMade(true);
                                    }}
                                ></RequiredTextField>

                                <Label>Venmo:</Label>
                                <VenmoTextField
                                    label="Account ID"
                                    name="venmo"
                                    defaultValue={user.venmo}
                                    onChange={(e) => {
                                        setUserProps("venmo", e.target.value);
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("venmo");
                                        setChangesMade(true);
                                    }}
                                ></VenmoTextField>

                                <Label>Car Color:</Label>
                                <CollegeSelect
                                    variant="outlined"
                                    margin="dense"
                                    defaultValue={user.carColor}
                                    classes={{ root: classes.inputLabelProps }}
                                    onChange={(e) => {
                                        selectCarColor(e);
                                        setCarColor(e);
                                        setChangesMade(true);
                                    }}
                                >
                                    <MenuItem value="White">White</MenuItem>
                                    <MenuItem value="Black">Black</MenuItem>
                                    <MenuItem value="Gray">Gray</MenuItem>
                                    <MenuItem value="Silver">Silver</MenuItem>
                                    <MenuItem value="Blue">Blue</MenuItem>
                                    <MenuItem value="Red">Red</MenuItem>
                                    <MenuItem value="Brown">Brown</MenuItem>
                                    <MenuItem value="Green">Green</MenuItem>
                                    <MenuItem value="Gold">Gold</MenuItem>
                                </CollegeSelect>

                                <Label>Car Brand:</Label>
                                <CarBrandTextField
                                    label="e.g. Toyota, Honda, KIA"
                                    defaultValue={user.carBrand}
                                    name="carBrand"
                                    onChange={(e) => {
                                        setUserProps(
                                            "carBrand",
                                            e.target.value
                                        );
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("carBrand");
                                        setChangesMade(true);
                                    }}
                                ></CarBrandTextField>

                                <Label>Car Type:</Label>
                                <CollegeSelect
                                    variant="outlined"
                                    margin="dense"
                                    defaultValue={user.carType}
                                    classes={{ root: classes.inputLabelProps }}
                                    onChange={(e) => {
                                        selectCarType(e);
                                        setCarType(e);
                                        setChangesMade(true);
                                    }}
                                >
                                    <MenuItem value="Sedan">Sedan</MenuItem>
                                    <MenuItem value="SUV">SUV</MenuItem>
                                    <MenuItem value="Minivan">Minivan</MenuItem>
                                    <MenuItem value="Truck">Truck</MenuItem>
                                </CollegeSelect>

                                <Label>Car License Plate Number:</Label>
                                <CarBrandTextField
                                    defaultValue={user.carLicense}
                                    name="licensePlate"
                                    onChange={(e) => {
                                        setUserProps(
                                            "licensePlate",
                                            e.target.value
                                        );
                                        setChangesMade(true);
                                    }}
                                    clearTextField={() => {
                                        clearTextField("licensePlate");
                                        setChangesMade(true);
                                    }}
                                ></CarBrandTextField>
                            </InputBox>

                            <SaveButton
                                variant="contained"
                                onClick={() => {
                                    // trim out "-" from number
                                    setUserProps(
                                        "phone",
                                        user.phone.replace(/[ +-]/g, "")
                                    );

                                    if (
                                        user.firstName === "" ||
                                        user.lastName === ""
                                    ) {
                                        addToast(
                                            "Please fill in your full name.",
                                            { appearance: "error" }
                                        );
                                        return;
                                    }

                                    if (user.phone === "") {
                                        addToast(
                                            "Please fill in your phone number.",
                                            { appearance: "error" }
                                        );
                                        return;
                                    }

                                    if (/^[0-9]+$/.test(user.phone) === false) {
                                        addToast(
                                            "Phone number must only contain digits.",
                                            { appearance: "error" }
                                        );
                                        return;
                                    }

                                    if (
                                        (user.carColor === "" ||
                                            user.carBrand === "" ||
                                            user.carType === "" ||
                                            user.licensePlate === "") &&
                                        (user.carColor !== "" ||
                                            user.carBrand !== "" ||
                                            user.carType !== "" ||
                                            user.licensePlate !== "")
                                    ) {
                                        addToast(
                                            "Please make sure all of the fields are filled.",
                                            { appearance: "error" }
                                        );
                                        return;
                                    }

                                    if (changesMade) {
                                        updateUserInfo();
                                    }
                                    setOpenDialog(false);
                                    addToast("User Information Updated", {
                                        appearance: "success",
                                    });
                                }}
                            >
                                Save
                            </SaveButton>
                        </ProfileDialogContainer>
                    </StyledDialogContent>
                </List>
            </Paper>
        </Dialog>
    );
}
