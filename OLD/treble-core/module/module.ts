/*
    Core Treble GSM Module
    - Core Middleware and SubscribeAPI methods
*/

import createModule from '../../create-module/create-module';
import TrebleCoreStore from './extend-store';
import TrebleCoreComp from './render-comp';
import renderGuard from './middleware/render-guard';
import { update as updateStore, run as runStoreSideEffect, toggle as toggleStore, reset as resetStore, resetAll as resetAllStore } from './dispatchers';
import { updateState, toggleState, resetToInitialState, resetAllToInitialState, runSideEffect, reducerActionKeys } from './reducer-actions';
import { ITrebleCore } from './interfaces';

const TrebleCore = createModule({
    name: 'treble-core',
    extendStore: TrebleCoreStore as any,
    renderComponent: TrebleCoreComp as any,
    namespace: 'core',
    middleware: {
        check: renderGuard
    },
    dispatchers: {
        'update': updateStore,
        'run': runStoreSideEffect,
        'toggle': toggleStore,
        'reset': resetStore,
        'resetAll': resetAllStore
    },
    reducerActions: {
        [reducerActionKeys.update]: updateState,
        [reducerActionKeys.toggle]: toggleState,
        [reducerActionKeys.run]: runSideEffect,
        [reducerActionKeys.reset]: resetToInitialState,
        [reducerActionKeys.resetAll]: resetAllToInitialState
    }

});

export { reducerActionKeys, ITrebleCore }
export default TrebleCore

