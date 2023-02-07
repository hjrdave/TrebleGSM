/*
    Scoped Treble Hook
    Gives scoped treble components access to store.
*/

import {createContext} from 'react';

const useScopedTreble = () => createContext([]);

export default useScopedTreble;