import React from 'react';
import { Machine } from 'xstate';
import { assign } from 'xstate';
import { useMachine } from '@xstate/react';
import axios from 'axios';

const protectedMachine = Machine({
  context: {
    user: null,
    error: null
  },
  initial: 'authenticating',
  states: {
    authenticating: {
      invoke: {
        src: () => axios('http://localhost:8000/user'),
        onDone: {
          target: 'authenticated',
          actions: assign({
            user: (context, event) => event.data
          })
        },
        onError: {
          target: 'authenticationFailed',
          actions: assign({
            error: (context, event) => event.data
          })
        }
      }
    },
    authenticated: {},
    authenticationFailed: {}
  }
});

const Protected = () => {
  const [current, send] = useMachine(protectedMachine);

  switch (true) {
    case current.matches('authenticating'):
      return <h3>Signing in, please wait...</h3>;

    case current.matches('authenticated'):
      return <h3>{JSON.stringify(current.context.user, null, 4)}</h3>;

    case current.matches('authenticationFailed'):
      return <h3>You have no permission fool...</h3>;
  }
};

export default Protected;
