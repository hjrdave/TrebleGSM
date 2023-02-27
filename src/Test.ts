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
        onLoad: (parcel, setState) => {
            const state = parcel.getNextState();
            const key = parcel.getKey();
            console.log(`State "${key}: ${state}" was added to Store`);
        },
        onCallback: (parcel) => {
            if (!parcel.getIsInitialDispatch()) {
                const state = parcel.getNextState();
                const key = parcel.getKey();
                console.log(`State "${key}" was updated to "${state}"`);
            }
        }
    }
});
Store.addItem({
    type: 'number',
    key: 'age',
    state: 54
});

Store.setState<string>('name', (prevState) => prevState);
Store.setState('name', 'bobby2');