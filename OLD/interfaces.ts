/*
    TrebleGSM Namespace
*/

import React from 'react';
import { ITrebleCore } from './treble-core/module/interfaces';

export declare namespace TrebleGSM {

  //Store State model
  export interface StoreState {
    [key: string]: any
  }

  //Store Item Features Model
  export interface StoreFeatures<S = StoreState, D = Dispatchers, F = {}> extends MiddlewareTypes<S, D, F> { }

  //Store Item Model (this is the problem interface, for state inheritance issues)
  export interface StoreItem<S = StoreState, F = StoreFeatures> {
    action: string,
    state: S,
    features?: F
  }

  //Store Options Model
  export interface StoreOptions {
    context?: any,
    extendStore?: { data: StoreItem[] }[],
    modules?: ModuleData[],
    inheritModules?: boolean
  }

  export interface DispatcherOptions {
    disableMiddleware?: boolean;
    sideEffectOnly?: boolean;
    renderGuard?: boolean;
    allowPayloadListeners?: boolean;
  }

  export interface DispatchPayload {
    type: string;
    [key: string]: any;
    reducerAction?: string;
    options?: DispatcherOptions
  }

  export interface MiddlewareTypes<S = StoreState, D = Dispatchers, F = StoreFeatures> {
    log?: (middlewareData: MiddlewareData<S, D, F>) => void,
    check?: (middlewareData: MiddlewareData<S, D, F>) => boolean,
    run?: (middlewareData: MiddlewareData<S, D, F>) => void,
    process?: (middlewareData: MiddlewareData<S, D, F>) => any,
    callback?: (middlewareData: MiddlewareData<S, D, F>) => void,
    payloadListener?: (payload: DispatchPayload) => void
  }
  export interface MiddlewareData<S = StoreState, D = Dispatchers, F = StoreFeatures> {
    dispatchValue: any,
    dispatchPayload: DispatchPayload,
    initialDispatchValue: any,
    action: string,
    features: F | undefined,
    currentState: any,
    initialState: any,
    storeItems: StoreItem<S>[],
    storeState: S,
    storeModules: ModuleData[],
    dispatchers: D
  }

  export interface ModuleData {
    name: string,
    extendStore?: {
      data: StoreItem[],
      options?: StoreOptions
    },
    featureKeys?: string[],
    dispatchers?: { [key: string]: (...params: any) => void },
    reducerActions?: { [key: string]: (middlewareData: MiddlewareData) => any }
    middleware?: MiddlewareTypes,
    renderComponent?: React.ReactNode,
    namespace?: string,
    namespaceDispatchers?: boolean,
    namespaceFeatureKeys?: boolean,
    importModules?: ModuleData[]
  }

  export interface State {
    [key: string]: any
  }
  export interface Dispatchers extends ITrebleCore.Dispatchers {
    dispatch: (payload: DispatchPayload) => DispatchPayload;
  }

  export interface Utilities<A = void, AR = void> {
    actions: A | { [key: string]: string };
    stateKeys: string[];
    actionKeys: string[];
    reducerActions: AR | { [key: string]: string };
    storeData: any,
    moduleData: TrebleGSM.ModuleData[]
  }


}



