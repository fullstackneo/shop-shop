// createContext will be used to instantiate a new Context object. The more meaningful term we can use here is that we're using it to create the container to hold our global state data and functionality so we can provide it throughout our app!

// useContext is another React Hook that will allow us to use the state created from the createContext function.

import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// add the following code below it to actually instantiate the global state object:

// When we run the createContext() function, it creates a new Context object

// Every Context object comes with two components, a Provider and Consumer. The Provider is a special type of React component that we wrap our application in so it can make the state data that's passed into it as a prop available to all other components. The Consumer is our means of grabbing and using the data that the Provider holds for us.
const StoreContext = createContext();
const { Provider } = StoreContext;

// With this function, StoreProvider, we instantiate our initial global state with the useProductReducer() function we created earlier.

// The value prop is good to have included, as it opens us up to pass in more data for state if we need to. We don't actually need to in this app, but it makes this provider flexible.
const StoreProvider = ({ value = [], ...props }) => {
  // state is the most up-to-date version of our global state object.

  // dispatch is the method we execute to update our state. It is specifically going to look for an action object passed in as its argument, as we'll soon see.
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: '',
  });
  // use this to confirm it works!
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

//  The last thing we need to do is create the custom function using the useContext() Hook to be used by the components that actually need the data our <StoreProvider> will be, well . . . providing!

// 在一个组件中执行useStoreContext(),即可获取[state, dispatch] 最新状态或者更新状态

// we can use our useStoreContext() function to grab the state from the <StoreProvider> component and use the returning dispatch method to update it

// our own hook
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
