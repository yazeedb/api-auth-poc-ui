import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const Login = () => {
  const [user, setUser] = React.useState(null);

  return (
    <div>
      {user && <h3>{JSON.stringify(user, null, 4)}</h3>}
      <form
        className="login"
        onSubmit={async (e) => {
          e.preventDefault();

          await axios('/airlock/csrf-cookie');

          await axios.post('/login', {
            email: 'your@email.com',
            password: 'Your Password'
          });

          const response = await axios('/api/user');

          setUser(response.data);
        }}
      >
        <h2>The info is ready, just hit submit</h2>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
