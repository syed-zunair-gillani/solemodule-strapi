import { initializeStore } from "../redux/store";
import React, { useEffect } from "react";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default function withReduxStore(App) {
  return function AppWithRedux(props) {
    const reduxStore = getOrCreateStore(props.initialReduxState);

    useEffect(() => {
      // Cleanup logic
      return () => {
        if (!isServer) {
          // Perform cleanup tasks here
          // For example: close connections, unsubscribe from event listeners, etc.
        }
      };
    }, []);

    return <App {...props} reduxStore={reduxStore} />;
  };
}
