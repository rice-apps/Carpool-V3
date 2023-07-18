import React from "react";
import { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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
  const [filterRideType, setfilterRideType] = useState(null);

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
        if (filterRideType != null) {
          resultDestArr = resultDestArr.filter((ele) => {
            return moment(ele.rideType).isSame(moment(rideType))
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

  return (
    <React.Fragment>
      <Form className="search-form">
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing="4"
        >
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
              onChange={(ev) => {
                handleClickStartLoc(ev.target.value);
              }}
              variant="outlined"
              size="small"
            >
              <MenuBox value="">None</MenuBox>
              {PossibleLocations.map((option, locInd) => (
                <MenuBox key={option._id} value={locInd}>
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
              labelId="EndLoc"
              value={endLoc}
              onChange={(ev) => {
                handleClickEndLoc(ev.target.value);
              }}
              variant="outlined"
              size="small"
            >
              <MenuBox value="">None</MenuBox>
              {PossibleLocations.map((option, locInd) => (
                <MenuBox key={option._id} value={locInd}>
                  {option.title}
                </MenuBox>
              ))}
            </SelectBox>
          </Grid>
          <Grid item xs={10}>
            <Grid
              container
              direction="row"
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
                {/* <RideTypePicker 
                    clearable
                    value={filterRideType}
                    onChange={(rideType) => {
                      setfilterRideType(rideType);
                      localStorage.setItem("searchedRideType", rideType);
                    }}
                    // closeLoaderIn2Seconds();
                  />  */}
                  {/* temp component above until frontend finished  */}
                {/* {showLoader && <LoadingDiv height={"15vh"} />} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>
  );
};

export default FormOnly;
