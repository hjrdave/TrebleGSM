
/*
    Default Context
    Main context for Treble Container (non-scoped).
*/

import { createContext } from 'react';
import { TrebleGSM } from './interfaces';

const DefaultContext = createContext<Partial<[any, TrebleGSM.Dispatchers]> | null>(null);

export default DefaultContext;