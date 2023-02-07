/*
    Returns an array of action strings.
*/
interface IGetCurrentStoreData{
    (
        store?: any
    ): string[]
}

const getCurrentStoreData: IGetCurrentStoreData = (store) => {
    const storeDataArray = store?.map((storeItem: {action: string, state: any, features: any}) => {
        return {
            action: storeItem.action,
            state: storeItem.state,
            features: storeItem.features
        }
    });
   return storeDataArray;
   
}

export default getCurrentStoreData;