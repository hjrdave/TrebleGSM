/*
    Returns an array of state key strings
*/
interface IGetStateKeys{
    (
        store?: any
    ): string[]
}

const getStateKeys: IGetStateKeys = (store) => {
    const stateKeyArray = store?.map((storeItem: {state: string}) => {
        return Object.keys(storeItem.state)[0]
    });
   return stateKeyArray;
   
}

export default getStateKeys;