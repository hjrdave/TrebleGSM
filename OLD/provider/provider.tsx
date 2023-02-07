/*
  Context Provider
  Provider that consumes Reducer hook and provides state to wrapped children.  
*/
import React, { useReducer } from "react";
import createDispatchers from "../dispatchers";
import createUtilities from '../utilities';
import { TrebleGSM } from '../interfaces';

interface Props {
  reducer: any,
  initialState: { [key: string]: any },
  children: JSX.Element[] | JSX.Element,
  scope: any,
  store: TrebleGSM.StoreItem[],
  modules: TrebleGSM.ModuleData[]
}

const Provider = ({ reducer, initialState, children, scope, store, modules }: Props) => {

  const Context = scope;
  const [state, dispatch] = useReducer(reducer, initialState);

  //SubcribeAPI (store items, dispatchers, and utilities that will be made accessible via the useTreble hook)
  const subscribeAPI = [state, createDispatchers(dispatch, modules), createUtilities(store, modules)]

  return (
    <>
      <Context.Provider value={subscribeAPI}>

        {/** Render Module Components */}
        {
          modules?.map((module, index: number) => {
            const RenderComponent: any = module.renderComponent;
            return (
              <React.Fragment key={index}>
                {
                  (RenderComponent) ?
                    <RenderComponent /> : null
                }
              </React.Fragment>
            )
          })
        }

        {children}
      </Context.Provider>
    </>
  );
};

export default Provider;
