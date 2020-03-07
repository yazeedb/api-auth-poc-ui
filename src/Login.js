import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = () => {
  const history = useHistory();

  React.useEffect(() => {
    const meta = document.createElement('meta');

    meta.name = 'google-signin-client_id';
    meta.content =
      '235318923218-s6tms65fam3o6d51shlhmci587s5mi22.apps.googleusercontent.com';

    document.head.appendChild(meta);

    const script = document.createElement('script');

    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: async (googleUser) => {
          const { id_token } = googleUser.getAuthResponse();

          // await axios('/airlock/csrf-cookie');

          const response = await axios.post('/signupViaGoogle', {
            idToken: id_token
          });

          axios.post('/login', { idToken: response.data.userId });
        },
        onfailure: console.warn
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div id="my-signin2" />;
};

export default Login;
