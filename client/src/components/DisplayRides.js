import React, {Component} from 'react'

import styled from 'styled-components'
import { styled as styledM } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

/*
const useStylesContainer = makeStyles(theme => ({
    root: {
      height: '100vh',
    }
  }));
*/

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

const GridInside = styledM(Grid)({
    backgroundColor: '#007777',
})

//{"Ride #" + ride.uid + " startLoc=" + ride.startLoc + " endLoc=" + ride.endLoc + " date=" + ride.date + " time=" + ride.time + " numberPeople=" + ride.numberPeople}

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
        alignItems="center"
        height="100vh"
        spacing={3}
        >
            {
            ridesT.map((ride, ind) => (
                <Grid item container key={ride.uid} xs={12} alignItems='stretch' style={{backgroundColor: 'yellow', height: '100%', display: 'flex'}}>

              <Grid item xs={3} display="flex" justify="center" align='center'>
                  <Box width={"10vw"} height={"15vh"} style={{display: 'flex', flexDirection: 'column', backgroundColor: 'red'}}>
                    <div style={{height: '1.5vw'}}></div>
                    <span style={{fontSize: '3vw'}}>{ride.numberPeople}</span>
                    
                    <span style={{fontSize: '1.5vw'}}>seats left</span>
                    
                </Box>
              </Grid>
              <Grid item xs={3} display="flex" justify="center" align='center'>
               <Box width={"10vw"} style={{backgroundColor: 'red'}}>
                   {ride.startLoc}
               </Box>
              </Grid>
              <Grid item xs={3} style={{height: '100%', flex: 1}}>
                {ride.endLoc}
              </Grid>
              <Grid item xs={3} style={{height: '100%', flex: 1}}>
                Jan 2
              </Grid>

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
