import TrebleGSM from "./TrebleGSM";

const Store = TrebleGSM.Store();

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
                const state = parcel.getNextState();
                const key = parcel.getKey();
                console.log(`State "${key}" was updated to "${state}"`);
            }
        }
    }
});
Store.setState('name', 'bobby');
Store.setState('name', 'bobby2');