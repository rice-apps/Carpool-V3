import React from 'react'
import { useState, useEffect } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import {
    MenuItem,
    Grid, 
    Button, 
    Select, 
    InputLabel,
    FormControlLabel, 
    Checkbox, 
    MuiThemeProvider, 
    createMuiTheme
} from '@material-ui/core';
import DisplayRides from '../components/DisplayRides'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';


import "@fontsource/source-sans-pro";

/*
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
*/

//import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker'

import TextField from '@material-ui/core/TextField';

/*
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
*/

//import Box from '@material-ui/core/Box';

import styled from 'styled-components'
import Create from './Create';

const FormOnly = (props) => {

  //const PossibleLocations = ['IAH', 'Greenbriar Lot', 'Rice Village', 'S1', 'S2', 'S3', 'S4', 'Shop1', 'Shop2', 'Shop3']
  //const [PossibleLocations, setPossibleLocations] = useState([]);

  /*
  props.getLocsRefetch()
  .then((res) => {
    setPossibleLocations(res.data.locationMany);
    console.log("getLocsRefetch().then() PossibleLocations=", PossibleLocations);
  })
  .catch((err) => {
    console.log("getLocsRefetch() err=", err);
  })
  */

  const PossibleLocations = props.testLocations;

  //rides is Database of current rides (to be more specific, all rides after the current IRL time)
  //export const rides = [{id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3}, {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5}, {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8}, {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}];

  //DefaultDestinations should only contain the dest property of each element ideally (can use map function for this)
  const DefaultLocations = {
    startLoc: PossibleLocations,
    endLoc: PossibleLocations
  };

  

  const [ridesPossibleForm, setRidesPossibleForm] = useState([]);
  //let ridesPossibleForm = [];

  useEffect(() => {
    console.log("useEffect run()");
    props.getRidesRefetch()
    .then((res) => {
      console.log("in useEffect refetchRide().then() res.data.rideMany=", res.data.rideMany);
      //ridesPossibleForm = res.data.rideMany;
      setRidesPossibleForm(res.data.rideMany);
      displayRef.current.setRidesPossible(res.data.rideMany);
      //props.updateResultRides(res.data.rideMany);
    })
    .catch((err) => {
      console.log("err=", err);
    });
  }, []);

  /*
  props.getRidesRefetch()
  .then((res) => {
    ridesPossibleForm = res.data.rideMany;
    console.log("in getRidesRefetch.then(), ridesPossibleForm=", ridesPossibleForm);
    displayRef.current.setRidesPossible(ridesPossibleForm);
  })
  .catch((err) => {console.log("getRidesRefetch() err=", err);});
  */

  /*
const GET_RIDES = gql`
query GetRides(
    $startLoc: Float, $endLoc: Float, $date: Date, $passengers: Float) 
    {
      ride
      departureDate,
      spots
    }
`
*/

const handleGetRides = async () => {
  console.log("handleGetRides() run");

  const ridesPossible = await props.getRidesCall();

  console.log("ridesPossible=", ridesPossible);
  if (ridesPossible) {
    this.displayRef.setRidesPossible(ridesPossible);
  } else {
    console.log("Fetch error with this.props.getRidesCall()");
  }
}

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#0B3669',
		}
	},
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: 'Josefin Sans',
                color: '#0B3669',
                padding: '0px 0px 0px 0px'
            }
        }
    },
})

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;
    padding: 40px;
    border-radius: 25px;
    background: #718fb0;


`;

const SelectBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '55vw',
        borderRadius: 8,
        border: 0,
        borderColor: '#0B3669',
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px 8px 16px'
    }
  })(Select);

const MenuBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '65vw',
        border: 0,
        color: '#0B3669',
        height: 36,
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
})(MenuItem);

const ColorButton = withStyles({
    root: {
        background: '#2075D8',
        width: '70vw',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        fontFamily: 'Josefin Sans'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  const InputBox = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(InputLabel);

  const FormControlLabelBox = withStyles({
    label: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(FormControlLabel);

  const DateBox = withStyles({
    root: {
        width: '68vw',
        height: '10vh'
    }, 
  })(KeyboardDateTimePicker);

  const CheckBox = withStyles({
      root: {
        color: '#0B3669', 
        backgroundColor: 'transparent'
      }
  })(Checkbox);

  const SelectSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: 'white',
        width: '5vw',
        borderRadius: 8,
        border: 0,
        borderColor: '#0B3669',
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px 8px 16px'
    }
  })(Select);

  const MenuSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '15vw',
        border: 0,
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
  })(MenuItem);

  const BodyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 2vh;
    line-height: 2vh;
    color: #0B3669;
    padding: 10px 0px 0px 0px;
  `;

  const displayRef = props.displayRef;

  let resultDestArr = null;
  let testKey = 1;

  let temp = 3;

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+14);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const maxDate = new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate());

  const testValue = [new Date("7/12/21"), new Date("7/15/21")]

    console.log("startValue=" + startValue + " endValue=" + endValue + " minDate=" + minDate + " maxDate=" + maxDate);

    const dictNames = {startLoc: 0, endLoc: 1, date: 2, time: 3, numberPeople: 4}
    
    const [startLoc, setStartLoc] = useState(null)
    const [endLoc, setEndLoc] = useState(null)

    //const [date, setDate] = useState('2020-09-11T12:00:00')
    //const [date, setDate] = useState(new Date())
    
    const [dateRange, setDateRange] = useState([startValue, endValue])

    //const [open, setOpen] = useState(false)
    
    const [time, setTime] = useState(null)
    const [numberPeople, setNumberPeople] = useState(null)

    const [isSelected, setIsSelected] = useState({startLoc: new Array(DefaultLocations.startLoc.length).fill(false), endLoc: new Array(DefaultLocations.endLoc.length).fill(false), date: [false]})
    const selectedColors = ['white', 'blue']

    const [indSelected, setIndSelected] = useState(-1)

    //const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const SearchDiv = styled.div`
    border: 5px solid #ddddff;
    padding: 10vw;
    display: flex;
    align-content: space-between;
    justify-content: center;
    @media (max-width: 480px) {
      background-color: #a9d5e8;
    }
    `;

    //Got rid of overflow-x: auto. overflox-x determines what happens when the content of an element is too big for the element to display within its boundaries
    //when that happens, the value of overflow-x determines if there is a scrollbar or if the excess content is displayed outside of the element's boundaries or not displayed at all
    const SearchControl = styled.div`
    margin-top: 10vw;
    margin-bottom: 10vw;
    white-space: nowrap;
    text-align: right;
    `;

    const SearchControl2 = styled.div`
    margin-top: 10vw;
    margin-bottom: 10vw;
    white-space: nowrap;
    text-align: right;
    background-color: #ff7777;
    `;

    const SubHeading = styled.div`
    
    `;

    const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const compareDates = (date1, date2, equals) => {
      //date1 = 1st date, date2 = 2nd date, equals = boolean variable if equals is true then the function returns true for date1 >= date2, not just date1 > date2
      const d1 = [date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes()]
      const d2 = [date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes()]

      if (d1[0] == d2[0]) {
        if (d1[1] == d2[1]) {
          if (d1[2] == d2[2]) {
            if (d1[3] == d2[3]) {
              return d1[4] > d2[4] || (equals && d1[4] == d2[4]);
            }
            return d1[3] > d2[3] || (equals && d1[3] == d2[3]);
          }
          return d1[2] > d2[2] || (equals && d1[2] == d2[2]);
        }
        return d1[1] > d2[1] || (equals && d1[1] == d2[1]);
      }

      return d1[0] > d2[0] || (equals && d1[0] == d2[0]);
    }
    
    //console.log(compareDates(testValue[1], testValue[0], true));
    
    const combineDateWithTime = (d, t) => {
      if (d == null) {
        return null;
      }
      let useT = t;
      if (t == null) {
        useT = "00:00";
      }

      const splitT = useT.split(":");
      
      return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      parseInt(splitT[0]),
      parseInt(splitT[1]),
      );
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search form submitted.");
        console.log("Search query = [ startLoc=" + startLoc + " endLoc=" + endLoc + " dateRange=" + dateRange + " time=" + time + " numberPeople=" + numberPeople + " ]");

        console.log("ridesPossibleForm before .getRidesRefetch() in onSubmit()=", ridesPossibleForm);

        let ridesPossible = null;

        props.getRidesRefetch()
        .then((res) => {
          ridesPossible = res.data.rideMany;
          console.log("in getRidesRefetch.then(), ridesPossible=", ridesPossible);
          //ridesPossibleForm = ridesPossible;
          displayRef.current.setRidesPossible(ridesPossible);
        })
        .catch((err) => {console.log("getRidesRefetch() err=", err);});

        console.log("ridesPossible after props.getRidesRefetch()=", ridesPossible);

        //handleGetRides();

        /*
        props.getRidesCall()
        .then((res) => {
          if (res == undefined || res == null) {
            console.log("getRidesCall() returned undefined or null response");
          } else {
            ridesPossible = res;
            displayRef.current.setRidesPossible(ridesPossible);
          }
        })
        .catch((err) => {
          console.log("getRidesCall() error err=", err);
        });
        */

        /*
        const ridesPossible = props.getRidesCall();
        console.log("in onSubmit() after props.getRidesCall(), ridesPossible=", ridesPossible);
        //Use the updated list of all rides from database as the new possible rides
        if (ridesPossible == undefined || ridesPossible == null) {

        } else {
        displayRef.current.setRidesPossible(ridesPossible);
        }
        */

        //console.log("data=", data);

        const dateTimeRange = [combineDateWithTime(dateRange[0], time), combineDateWithTime(dateRange[1], time)];
        console.log("dateTimeRange=", dateTimeRange);

        //Make sure that ridesPossibleForm (FormOnly component's variable that stores the updated all rides from database)
        //has been updated with a new refetch() already.
        resultDestArr = ridesPossibleForm;
        console.log("ridesPossibleForm=", ridesPossibleForm);

        if (startLoc != null) {
          resultDestArr = resultDestArr.filter((ele) => { return (ele.departureLocation.title == PossibleLocations[startLoc].title);});
        }
        console.log("resultDestArr after startLoc=", resultDestArr);
        if (endLoc != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.arrivalLocation.title == PossibleLocations[endLoc].title);});
        }
        console.log("resultDestArr after endLoc=", resultDestArr);

        if (dateTimeRange[0] != null && dateTimeRange[1] != null) {
        resultDestArr = resultDestArr.filter((ele) => { return compareDates(new Date(ele.departureDate), dateTimeRange[0], true) && !compareDates(new Date(ele.departureDate), dateTimeRange[1], false);});
        }
        console.log("resultDestArr after dateTimeRange=", resultDestArr);

        if (numberPeople != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.spots >= numberPeople);});
        }
        console.log("resultDestArr after numberPeople after every filter=", resultDestArr);

        displayRef.current.setRides(resultDestArr);

        testKey++;
    }

    const handleClickStartLoc = (locInd) => {
      console.log("handleClickStartLoc() run, locInd=", locInd);
      setStartLoc(locInd);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.startLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      /*
      const isSelectedDest = Array.from(isSelected.startLoc);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      console.log("isSelectedDest=", isSelectedDest);
      setIsSelected({...isSelected, startLoc: isSelectedDest, });
      */

      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const handleChangeStartLoc = (dest) => {
      setStartLoc(dest);

      setIndSelected(dictNames.startLoc);
    }

    const handleClickEndLoc = (locInd) => {
      console.log("handleClickEndLoc() run, locInd=", locInd);
      setEndLoc(locInd);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.endLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      /*
      const isSelectedDest = Array.from(isSelected.endLoc);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      console.log("isSelectedDest=", isSelectedDest);

      setIsSelected({...isSelected, endLoc: isSelectedDest, });
      */
      
      //console.log(JSON.parse(JSON.stringify(isSelected)));
      
    }

    const handleChangeEndLoc = (dest) => {
      setEndLoc(dest);

      setIndSelected(dictNames.endLoc);
    }

    /*
    const handleChangeDate = (date) => {
      console.log("handleChangeDate() run, date=", date);
      setDate(date);

      setIndSelected(dictNames.date);

    }
    */

    const handleChangeTime = (time) => {
      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);
      setTime(time);

      setIndSelected(dictNames.time);

      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);

    }
    
    const handleClickPropName = (text, ind, propName) => {
      console.log("handleClickPropName() run, text=", text);
      this["set" + propName](text);
      //Error: "Search.js:218 Uncaught TypeError: Cannot read property 'setstartLoc' of undefined"

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames[propName]);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      const isSelectedDest = Array.from(isSelected[propName]);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      const newIsSelected = Array.from(isSelected)
      newIsSelected[propName] = isSelectedDest
      setIsSelected(newIsSelected);
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const displayDefaultProps = (arr, propName) => {
      return arr.map((ele, ind) => {
        return <Button key={ele} variant="outlined" color="primary" onClick={() => {handleClickPropName(ele, ind, propName);}} style={{backgroundColor: (isSelected[propName][ind] ? selectedColors[1] : selectedColors[0]),
          color: (isSelected[propName][ind] ? selectedColors[0] : selectedColors[1])}}>{ele}</Button>
      })
    }

    return (
      <React.Fragment>

        <Form className= 'search-form'>

            
            <Grid
                container
                direction='column'
                justifyContent='space-evenly'
                alignItems='center'
                spacing='4'
            >
               <Grid 
                    item
                    xs = {12}
                >   
 
            <InputBox id = 'StartLoc'>Departure Location</InputBox>
                    <SelectBox
                        id="Start Location Search Bar"
                        labelId='StartLoc'
                        value={startLoc}
                        onChange={(ev) => {handleClickStartLoc(ev.target.value)}}
                        variant='outlined'
                        size='small'
                    >
                        {
                            PossibleLocations.map((option, locInd) => (
                                <MenuBox key = {option._id} value = {locInd}>
                                    {option.title}
                                </MenuBox>
                            ))
                        }
                    </SelectBox>
            
              </Grid>

          <Grid  item xs = {12}>
     

          <InputBox id = 'EndLoc'>End Location</InputBox>
                    <SelectBox
                        id="End Location Search Bar"
                        labelId='EndLoc'
                        value={endLoc}
                        onChange={(ev) => {handleClickEndLoc(ev.target.value)}}
                        variant='outlined'
                        size='small'
                    >
                        {
                            PossibleLocations.map((option, locInd) => (
                                <MenuBox key = {option._id} value = {locInd}>
                                    {option.title}
                                </MenuBox>
                            ))
                        }
                    </SelectBox>
            
              </Grid>
              <Grid  item xs = {10} >
              <Grid 
                container
                direction='row'
                justifyContent='space-around'
                alignItems='center'
               >
                  <Grid item xs = {8}>
              <InputBox id = 'Date'>Date</InputBox>

    {/*
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
                */}
                
                <DateRangePickerComponent placeholder="Enter Date Range"
      startDate={startValue}
      endDate={endValue}
      min={minDate}
      max={maxDate}
      //minDays={3}
      ///maxDays={5}
      format="dd-MMM-yy"
      value={dateRange}
      change={(e) => {setDateRange([e.startDate, e.endDate]); console.log("DateRangePickerComponent new e=", e);}}
      //Uncomment below code to show month range picker. Also comment the properties min, max, mindays and maxdays
      //start="Year"
      //depth="Year"
      ></DateRangePickerComponent>
</Grid>
<Grid item xs = {3}>
<InputBox id = 'time'>Time</InputBox>
            <TextField
            id="time"
            label=""
            type="time"
            defaultValue={time}
            onChange={(e) => {
              handleChangeTime(e.target.time);
              console.log("Time field e.target=", e.target); console.log("Time field e.target.value=", typeof(e.target.value));
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            
          />
          </Grid>
          </Grid>
            </Grid>
            <Grid  item xs = {12}>

            <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing = '1'
                >
                    <Grid item>   
                    <TextField id="number-people" select value={numberPeople} onChange={e => {setNumberPeople(e.target.value); temp=e.target.value; console.log("temp=" + temp)}}>
              { [1,2,3,4,5,6,7,8,9,10,11,12,13].map((ele) => (
                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
              ))}
            </TextField>
            {/*
            <input
              type='text'
              placeholder='Number of People'
              value={numberPeople}
              onChange={(e) => setNumberPeople(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block'}}
            />
            */}
                    </Grid>
                    <Grid item>
                        <BodyText>{"Number of People"}</BodyText> 
                    </Grid>

</Grid>

           
</Grid>
<Grid  item xs = {12}>

              <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
        >
            Search RIDE
        </Button>
        </Grid>
        </Grid>

          </Form>
            
           </React.Fragment>
      )
}

export default FormOnly;
