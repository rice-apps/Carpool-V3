import { User, UserTC } from '../models';

const PfpQuery = {
    uploadPfp: UserTC.getResolver("upload")
};

const PfpMutation = {
    confirmPfp: UserTC.getResolver("upload"),
};

export { PfpQuery, PfpMutation };