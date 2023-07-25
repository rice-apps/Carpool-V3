import { PersonalCar, PersonalCarTC } from "../models";

const PersonalCarMutation = {
    carCreateOne: PersonalCarTC.getResolver("createOne"),
};

export { PersonalCarMutation };
