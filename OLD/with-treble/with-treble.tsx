/*
  withTreble
  This is a higher order function that wraps a class component 
  so the component can get access to the treble Store.
*/

import React from 'react';
import useTreble from '../hooks/use-treble';
import Treble from '../treble';
import { IWithTreble } from './interfaces';

export const withTreble: IWithTreble = (Component, options) => {

  //handle errors
  // errorHandling(Component, options);

  //checks to see if passed component is a class component
  if (Component.prototype instanceof React.Component) {
    return function ClassComponent(props: any) {
      const storeItems = useTreble()[0];
      const Store = useTreble()[1];
      const getTreble = [
        storeItems,
        Store
      ]
      return (
        <>
          <Component {...props} getTreble={getTreble} />
        </>
      );
    }
  }

  //returns functional by default
  return function FunctionalComponent(props: any) {
    return (
      <>
        {
          (options?.store !== undefined) ?
            <Treble store={options?.store}>
              <Component {...props} />
            </Treble>
            : null
        }
      </>
    )
  }
}

export default withTreble;