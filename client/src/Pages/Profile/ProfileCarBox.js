import { TextBox, StyledText, StyledText4 } from "./ProfileStyles";
import { gql, useQuery } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";
import { Redirect } from "react-router";

const ProfileCarBox = (props) => {
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

    const personalCarId = props.user.personalCar;
    console.log(personalCarId);
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
        <TextBox>
            <StyledText>Personal Car: </StyledText>
            <StyledText4>{carString}</StyledText4>
        </TextBox>
    );
};
export default ProfileCarBox;
