import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const Login = () => {
  return (
    <form
      className="login"
      onSubmit={(e) => {
        e.preventDefault();

        axios('/airlock/csrf-cookie').then((response) => {
          axios
            .post(
              '/login',
              {
                email: 'your@email.com',
                password: 'Your Password'
              },
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
            )
            .then((response) => {
              axios('/api/user')
                .then((response) => {
                  console.log(response.data);
                })
                .then(console.log);
            });
        });
      }}
    >
      <h2>The info is ready, just hit submit</h2>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
