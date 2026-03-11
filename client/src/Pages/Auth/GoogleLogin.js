import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router';

const AUTHENTICATE_WITH_GOOGLE = gql`
  mutation AuthenticateWithGoogle($googleIdToken: String!) {
    authenticateWithGoogle(googleIdToken: $googleIdToken) {
      _id
      netid
      token
      recentUpdate
    }
  }
`;

const GoogleLoginPage = () => {
  const history = useHistory();
  const [authenticateWithGoogle] = useMutation(AUTHENTICATE_WITH_GOOGLE);

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await authenticateWithGoogle({
        variables: { googleIdToken: credentialResponse.credential },
      });
      const { netid, token, recentUpdate } = data.authenticateWithGoogle;
      localStorage.setItem('token', token);
      localStorage.setItem('netid', netid);
      localStorage.setItem('recentUpdate', recentUpdate);
      if (!localStorage.getItem('nextPage')) localStorage.setItem('nextPage', 'home');
      history.push('/userAuth');
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error('Google Sign-In failed')}
        hosted_domain="rice.edu"
        useOneTap
      />
    </div>
  );
};

export default GoogleLoginPage;
