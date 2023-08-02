import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { BodyText } from "./Create.styles";
import { Redirect } from "react-router";
import LoadingDiv from "../../common/LoadingDiv";

const PersonalCarBox = (props) => {

    const GET_CAR = gql`
        query GetCarInfo($carId: MongoID!) {
            carOne(filter: { _id: $carId }) {
                _id
                carBrand
                carColor
                carType
                licensePlate
            }
        }
    `;

    const personalCarId = props.personalCarId;
    let {
        data: carData,
        loading: carLoading,
        error: carError,
    } = useQuery(GET_CAR, { variables: { carId: personalCarId } });
    if (carLoading) return <LoadingDiv />;
    if (carError) return <Redirect to="../404" />;
    let { carOne: car } = JSON.parse(JSON.stringify(carData));
    if (!car) return <Redirect to="../404" />;

    const carString = `${car.carColor} ${car.carBrand} ${car.carType}, 
    license plate: ${car.licensePlate}`;

    return (
        <React.Fragment>
            {carString !== "" ? (
                <>
                    <Grid item xs={12}>
                        <BodyText>Car Details: {carString}</BodyText>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item xs={12}>
                        <BodyText>
                            Please fill in your personal car details in your
                            profile.
                        </BodyText>
                    </Grid>
                </>
            )}
        </React.Fragment>
    );
};

export default PersonalCarBox;
