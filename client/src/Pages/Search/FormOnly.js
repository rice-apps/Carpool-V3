import React from "react";
import { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Select, MenuItem, Box, IconButton, AppBar, Toolbar, Typography } from '@material-ui/core';
import MomentUtils from "@date-io/moment";
import moment from "moment";
// import LoadingDiv from "../../common/LoadingDiv";

import { Grid } from "@material-ui/core";

import "@fontsource/source-sans-pro";
import { Form, SelectBox, MenuBox, InputBox } from "./FormOnly.styles";

const FormOnly = (props) => {
  const PossibleLocations = props.testLocations;

  const currentDate = moment();

  const [ridesPossibleForm, setRidesPossibleForm] = useState([]);

  // const [showLoader, setShowLoader] = useState(false);

  // const closeLoaderIn2Seconds = () => {
   //   setShowLoader(true);
  //   setTimeout(() => {
  //     setShowLoader(false);
  //   }, 1500);
   // };

  // initial filter: filters rides that are past current date
  useEffect(() => {
    props
      .getRidesRefetch()
      .then((res) => {
        var ridesPossibleNotBefore = res.data.rideMany.filter((ride) => {
          // const rideDateAfterCurrentDate = compareDates(
          //   new Date(ride.departureDate),
          //   currentDate,
          //   true
          // );
          const rideDateAfterCurrentDate = currentDate.isBefore(moment(ride.departureDate))
          return rideDateAfterCurrentDate;
        });

        setRidesPossibleForm(ridesPossibleNotBefore);
        props.setRidesPossible(ridesPossibleNotBefore);
      })
      .catch((err) => {
       });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const minDate = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   new Date().getDate()
  // );

  const minDate = moment()

  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");

  // state for filter date
  const [filterDate, setfilterDate] = useState(null);
  const [filterRideType, setfilterRideType] = useState('');
  const testRide = 'Uber'

  // does actual filtering, produces resultDestArr
  useEffect(() => {
    let resultDestArr = null;
    props
      .getRidesRefetch()
      .then((res) => {
        resultDestArr = ridesPossibleForm;
        if (startLoc !== "") {
          resultDestArr = resultDestArr.filter((ele) => {
            return (
              ele.departureLocation.title === PossibleLocations[startLoc].title
            );
          });
        }
        if (endLoc !== "") {
          resultDestArr = resultDestArr.filter((ele) => {
            return (
              ele.arrivalLocation.title === PossibleLocations[endLoc].title
            );
          });
        }
        // filters by only start date and only by year, month, day
        if (filterDate != null) {
          resultDestArr = resultDestArr.filter((ele) => {
            return moment(ele.departureDate).isSame(moment(filterDate), 'day')
          });
        }
        // filter by ride type
        if (filterRideType != '') {
          resultDestArr = resultDestArr.filter((ele) => {
            return (ele.typeofcar) === (filterRideType)
            // above (ele.rideType) I assume is going to come from the query
          });
        }

        props.setRides(resultDestArr);
      })
      .catch((err) => {
       });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLoc, endLoc, filterDate, filterRideType]);

  const handleClickStartLoc = (locInd) => {
    setStartLoc(locInd);
    localStorage.setItem("startLocation", locInd);
    console.log("handleClickStartLoc");

  };

  const handleClickEndLoc = (locInd) => {
    setEndLoc(locInd);
    localStorage.setItem("endLocation", locInd);
    console.log("handleClickEndLoc");
  };

     // New component for the filter
    // This will render a dropdown with options for Uber, Lyft, and Own Car
    // The current filter state is used as the value, and when it changes, it updates the filter state
  const Filter = () => {
      return (
          <Select
              value={filterRideType} // current filter state
              onChange={(event) => setfilterRideType(event.target.value)} // function to update the filter state when the value changes
          >
              <MenuItem value=''>All</MenuItem> // Option for all rides
              <MenuItem value='Uber'>Uber</MenuItem> // Option for Uber rides
              <MenuItem value='Lyft'>Lyft</MenuItem> // Option for Lyft rides
              <MenuItem value='own-car'>Personal Car</MenuItem> // Option for own car rides
          </Select>
      );
  }

  // // Define AppBar with Filter
  // const AppBarWithFilter = () => (
  //     <AppBar position="static">
  //         <Toolbar>
  //             <Typography variant="h6" style={{ flexGrow: 1 }}>
  //                 Ride Type
  //             </Typography>
  //             <Filter />
  //         </Toolbar>
  //     </AppBar>
  // );

  return (
    <React.Fragment>
      <Form className="search-form">
        <Grid>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12}>
              <InputBox id="Date">Date</InputBox>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  clearable
                  value={filterDate}
                  onChange={(date) => {
                    setfilterDate(date);
                    localStorage.setItem("searchedDate", date);
                    // closeLoaderIn2Seconds();
                  }}
                  minDate={minDate}
                  format="MMM DD, YYYY"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <InputBox id="Ride Type">Ride Type</InputBox>
              <Filter />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>
  );
  
  
};

export default FormOnly;
