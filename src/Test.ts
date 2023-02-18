import TrebleGSM from "./TrebleGSM";

const Store = TrebleGSM.Store();

Store.addItem({
    type: 'string',
    key: 'name',
    state: 'Bob',
    features: {
        // onLoad: (dispatchItem, setState) => {
        //     setState(dispatchItem.getKey(), 'Bobby Mooney');
        // },
        // onRun: (dispatchItem) => {
        //     console.log('On Run')
        //     dispatchItem.setNextState(`${dispatchItem.getNextState()} and awesome.`)
        //     console.log(dispatchItem)
        // },
        // onCallback: (dispatchItem, setState) => {
        //     if (dispatchItem.getFailCode() === 'WrongType') {
        //         setState(dispatchItem.getKey(), JSON.stringify(dispatchItem.getNextState()))
        //     }
        // }
    }
});
//Store.setState('name', 'Tom')
//Store.setState<string>('name', (prev) => `${prev}: I am next state`);
Store.setState('name', ['bobby'])
console.log(Store.getState('name'));