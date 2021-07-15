import React, {Component} from 'react'

import styled from 'styled-components'
import { styled as styledM } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/*
const RideContainer = styled.div`
    background-color: #1111aa;
    padding-top: 10vh;
    padding-bottom: 10vh;
    border: 3px solid black;
`;
*/

const GridT = styledM(Grid)({
        backgroundColor: '#00ffff',
})

class DisplayRides extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: props.rides,
            testVar: props.testVar
        }
    }

    displayRides(ridesT)  {
        console.log("ridesT=", ridesT);
        //return ridesT[0].startLoc;
        
        if (ridesT == null || ridesT == undefined) {
            return null;
        }

        /*
 direction="column"
        alignItems="center"
       
        */

        return <GridT container
        direction="column"
        alignItems="center"
        >
            {
            ridesT.map((ride, ind) => (
                <Grid item xs={10}>
            <Box
            key={ride.uid}
            boxShadow={3}
            m={1}
            p={1}
         
          >
          {"Ride #" + ride.uid + " startLoc=" + ride.startLoc + " endLoc=" + ride.endLoc + " date=" + ride.date + " time=" + ride.time + " numberPeople=" + ride.numberPeople}
          </Box>
          </Grid>
          ))
            }
            </GridT>
        
      }
    
      setRides(ridesTest) {
        this.setState({
            ...this.state,
            rides: ridesTest
        })
    }

      incrementVar() {
        this.setState({
            ...this.state,
            testVar: this.state.testVar + 1
        });

      }

      render() {
    return (
        <div>
            Display Rides Component
            testVar = {this.state.testVar}.
            <div>
                {
            this.displayRides(this.state.rides)
            }
            </div>
        </div>
    )
        }
}

export default DisplayRides
