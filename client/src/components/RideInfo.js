import React from 'react';
import { RideCard } from './RideInfo.styles.js';

const RideInfo = ({origin, destination, datetime}) => {
    return (
        <div>
            <RideCard>
                aldkhfadsf
            </RideCard>
        </div>
    )

    
}

// FOR NOW, USING FOR TESTING FRONT END
// DO WE HAVE TO CHECK FOR TYPE OR SPECIFY AT LEAST?
RideInfo.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    datetime: Date.now() 
}


export default RideInfo;