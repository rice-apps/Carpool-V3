import { PersonalCar, PersonalCarTC } from "../models";

const PersonalCarQuery = {
    carOne: PersonalCarTC.getResolver("findOne"),
};
const PersonalCarMutation = {
    carCreateOne: PersonalCarTC.getResolver("createOne"),
};

export { PersonalCarMutation, PersonalCarQuery };
