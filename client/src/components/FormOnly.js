import React from 'react'
import { useState, useEffect } from 'react'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import {
    MenuItem,
    Grid, 
    Button, 
} from '@material-ui/core';

import "@fontsource/source-sans-pro";
import TextField from '@material-ui/core/TextField';
import {
  Form,
  SelectBox,
  MenuBox,
  InputBox,
  BodyText
} from './FormOnly.styles'

const FormOnly = (props) => {

  const PossibleLocations = props.testLocations;

  const currentDate = new Date();

  const [ridesPossibleForm, setRidesPossibleForm] = useState([]);

  useEffect(() => {
    console.log("useEffect run()");
    props.getRidesRefetch()
    .then((res) => {
      console.log("in useEffect refetchRide().then() res.data.rideMany=", res.data.rideMany);

      const ridesPossibleNotBefore = res.data.rideMany.filter((ride) => {
        const rideDateAfterCurrentDate = compareDates(new Date(ride.departureDate), currentDate, true);
        return rideDateAfterCurrentDate;
      });
      
      setRidesPossibleForm(ridesPossibleNotBefore);
      displayRef.current.setRidesPossible(ridesPossibleNotBefore);
    })
    .catch((err) => {
      console.log("err=", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayRef = props.displayRef;

  let resultDestArr = null;

  let temp = 3;

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+14);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const maxDate = new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate());

    console.log("startValue=" + startValue + " endValue=" + endValue + " minDate=" + minDate + " maxDate=" + maxDate);

    const dictNames = {startLoc: 0, endLoc: 1, date: 2, time: 3, numberPeople: 4}
    
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')
    
    const [dateRange, setDateRange] = useState([startValue, endValue])
    
    const [time, setTime] = useState(null)
    const [numberPeople, setNumberPeople] = useState(null)

    const [indSelected, setIndSelected] = useState(-1)

    const compareDates = (date1, date2, equals) => {
      const d1 = [date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes()]
      const d2 = [date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes()]

      if (d1[0] === d2[0]) {
        if (d1[1] === d2[1]) {
          if (d1[2] === d2[2]) {
            if (d1[3] === d2[3]) {
              return d1[4] > d2[4] || (equals && d1[4] === d2[4]);
            }
            return d1[3] > d2[3] || (equals && d1[3] === d2[3]);
          }
          return d1[2] > d2[2] || (equals && d1[2] === d2[2]);
        }
        return d1[1] > d2[1] || (equals && d1[1] === d2[1]);
      }

      return d1[0] > d2[0] || (equals && d1[0] === d2[0]);
    }
    
    
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

          const ridesPossibleNotBefore = ridesPossible.filter((ride) => {
            const rideDateAfterCurrentDate = compareDates(new Date(ride.departureDate), currentDate, true);
            return rideDateAfterCurrentDate;
          });
          
          setRidesPossibleForm(ridesPossibleNotBefore);
          displayRef.current.setRidesPossible(ridesPossibleNotBefore);

        })
        .catch((err) => {console.log("getRidesRefetch() err=", err);});

        console.log("ridesPossible after props.getRidesRefetch()=", ridesPossible);

        const dateTimeRange = [combineDateWithTime(dateRange[0], time), combineDateWithTime(dateRange[1], time)];
        console.log("dateTimeRange=", dateTimeRange);

        //Make sure that ridesPossibleForm (FormOnly component's variable that stores the updated all rides from database)
        //has been updated with a new refetch() already.
        resultDestArr = ridesPossibleForm;
        console.log("ridesPossibleForm=", ridesPossibleForm);

        if (startLoc != null) {
          resultDestArr = resultDestArr.filter((ele) => { return (ele.departureLocation.title === PossibleLocations[startLoc].title);});
        }
        console.log("resultDestArr after startLoc=", resultDestArr);
        if (endLoc != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.arrivalLocation.title === PossibleLocations[endLoc].title);});
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
    }

    const handleClickStartLoc = (locInd) => {
      console.log("handleClickStartLoc() run, locInd=", locInd);
      setStartLoc(locInd);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.startLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));
    }

    const handleClickEndLoc = (locInd) => {
      console.log("handleClickEndLoc() run, locInd=", locInd);
      setEndLoc(locInd);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.endLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));
      
    }

    const handleChangeTime = (time) => {
      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);
      setTime(time);

      setIndSelected(dictNames.time);

      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);

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
                
                <DateRangePickerComponent placeholder="Enter Date Range"
      startDate={startValue}
      endDate={endValue}
      min={minDate}
      max={maxDate}
      format="dd-MMM-yy"
      value={dateRange}
      change={(e) => {setDateRange([e.startDate, e.endDate]); console.log("DateRangePickerComponent new e=", e);}}
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
