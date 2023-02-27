import TrebleGSM from "./TrebleGSM";
interface IState {
    name: string;
    age: number;
}
const Store = TrebleGSM.Store<IState, TrebleGSM.Features<IState, any>>();

Store.addItem({
    type: 'string',
    key: 'name',
    state: 'Bob',
    features: {
        onLoad: (parcel) => {
            const state = parcel.getNextState();
            const key = parcel.getKey();
            console.log(`State "${key}: ${state}" was added to Store`);
        },
        onCallback: (parcel) => {
            if (!parcel.getIsInitialDispatch()) {

                if (parcel.doesItemPass()) {
                    const state = parcel.getNextState();
                    const key = parcel.getKey();
                    console.log(`State "${key}" was updated to "${state}"`);
                    return
                }
                console.log(parcel.getAllFailReasons());
            }
        }
    }
});
Store.addItem({
    type: 'number',
    key: 'age',
    state: 54
});

Store.setState<string>('name', 'bobby1');
Store.setState('name', 'bobby2');
Store.setState('name', 'bobby2');