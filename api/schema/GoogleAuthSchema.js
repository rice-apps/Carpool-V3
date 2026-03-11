import { User, UserTC } from '../models';
import { createToken } from '../utils/authenticationUtils';
import { authenticateGoogleToken } from '../utils/googleAuthUtils';

UserTC.addResolver({
  name: 'authenticateWithGoogle',
  type: UserTC,
  args: { googleIdToken: 'String!' },
  resolve: async ({ args }) => {
    const result = await authenticateGoogleToken(args.googleIdToken);
    if (!result.success) throw new Error('Bad authentication.');

    const { netid } = result;
    let user = await User.findOne({ netid });
    if (!user) user = await User.create({ netid });

    const token = createToken(user);
    return User.findByIdAndUpdate(user._id, { token }, { new: true });
  },
});

export const GoogleAuthMutation = {
  authenticateWithGoogle: UserTC.getResolver('authenticateWithGoogle'),
};
