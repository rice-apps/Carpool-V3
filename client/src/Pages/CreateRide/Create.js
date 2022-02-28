import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Header from "../../common/Header/Header.js";
import { useToasts } from "react-toast-notifications";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, MuiThemeProvider } from "@material-ui/core";
import {
  customTheme,
  Form,
  SelectBox,
  TextFieldBox,
  MenuBox,
  ColorButton,
  InputBox,
  DateBox,
  SelectSquare,
  MenuSquare,
  BodyText,
  ConfirmationText,
} from "./Create.styles";
import LoadingDiv from "../../common/LoadingDiv.js";

const Create = ({ onCreate }) => {
  document.title = "Create Ride";

  const { addToast } = useToasts();

  const seats = [
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
  ];

  // Variables for Tracking Attributes of the Form
  const [startLoc, setStartLoc] = useState("");
  const [notes, setNotes] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(3);
  const confirmationText =
    "You will still need to contact your fellow riders and order an Uber or Lyft on the day of.";

  // Function after Submit Button is Pressed
  const onSubmit = (e) => {
    e.preventDefault();
    const users = [user._id];
    const owner = user._id;

    if (!startLoc || !endLoc) {
      addToast("Please fill in all fields.", { appearance: "error" });
      return;
    }

    if (startLoc === endLoc) {
      addToast("Ride departure and destination locations must be different.", {
        appearance: "error",
      });
      return;
    }

    // Pass arguments back to the top mutation queue
    onCreate({ startLoc, endLoc, date, passengers, notes, users, owner });

    setStartLoc("");
    setEndLoc("");
    setNotes("");
    setDate(new Date());
    setPassengers(4);
  };

  // OnChange Functions: Triggers for User Changing Fields

  const onStartLocChange = (e) => {
    e.preventDefault();
    setStartLoc(e.target.value);
  };

  const onNotesChange = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  };

  const onEndLocChange = (e) => {
    e.preventDefault();
    setEndLoc(e.target.value);
  };

  const onPassengerChange = (e) => {
    e.preventDefault();

    setPassengers(e.target.value);
  };

  // Access Locations List with GraphQL Query

  const GET_LOCATIONS = gql`
    query GetLocations {
      locationMany {
        _id
        title
      }
    }
  `;

  // Access Current User's MongoID with GraphQL Query

  const GET_USER = gql`
    query GetUserInfo($netID: String) {
      userOne(filter: { netid: $netID }) {
        _id
      }
    }
  `;

  const { data: locationData, loading: locationLoading } =
    useQuery(GET_LOCATIONS);

  const {
    data: userData,
    loading: userLoading,
    error,
  } = useQuery(GET_USER, {
    variables: {
      netID: localStorage.getItem("netid"),
    },
  });

  if (locationLoading || userLoading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  const { locationMany: locations } = locationData;
  const { userOne: user } = userData;

  if (!user) return <div>Invalid User ID</div>;

  // Form Construction

  return (
    <Form onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <Header subtitle={"Create Ride"} />
        <Grid item xs={12}>
          <InputBox id="StartLoc">Departure Location</InputBox>
          <SelectBox
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            id="Start Location Search Bar"
            labelId="StartLoc"
            value={startLoc}
            onChange={onStartLocChange}
            variant="outlined"
            size="small"
          >
            {locations.map((option) => (
              <MenuBox key={option.title} value={option._id}>
                {option.title}
              </MenuBox>
            ))}
          </SelectBox>
        </Grid>

        <Grid item xs={12}>
          <InputBox id="EndLoc">Destination</InputBox>
          <SelectBox
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            id="End Location Search Bar"
            labelId="Endloc"
            value={endLoc}
            onChange={onEndLocChange}
            variant="outlined"
            size="small"
          >
            {locations.map((option) => (
              <MenuBox key={option.title} value={option._id}>
                {option.title}
              </MenuBox>
            ))}
          </SelectBox>
        </Grid>

        <Grid item xs={12}>
          <InputBox id="Date and Time">Date and Time</InputBox>
          <MuiThemeProvider theme={customTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateBox
                labelid="Date and Time"
                inputVariant="outlined"
                format="MM/dd/yyyy   t"
                disablePast={true}
                value={date}
                onChange={setDate}
              />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </Grid>

        <Grid item xs={12}>
          <InputBox id="Notes">Notes</InputBox>

          <TextFieldBox
            id="outlined-basic"
            multiline
            placeholder="e.g. flight time, Rice meetup location, etc."
            labelId="Notes"
            variant="outlined"
            value={notes}
            onChange={onNotesChange}
          ></TextFieldBox>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <SelectSquare
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              id="Number of Passengers Occupied"
              value={passengers}
              onChange={onPassengerChange}
              variant="outlined"
              size="small"
            >
              {seats.map((option) => (
                <MenuSquare key={option.value} value={option.value}>
                  {option.value}
                </MenuSquare>
              ))}
            </SelectSquare>
          </Grid>
          <Grid item>
            <BodyText>{"# of seats (include yourself)"}</BodyText>
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <ConfirmationText>{confirmationText}</ConfirmationText>
        </Grid>

        <Grid item xs={12}>
          <ColorButton type="submit" variant="contained" size="medium">
            Create New Ride
          </ColorButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Create;
