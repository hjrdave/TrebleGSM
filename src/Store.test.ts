import TrebleGSM from './TrebleGSM';
import Features from './Features';

interface StoreProps {
    state1: string;
    state2: string;
    state3: string;
}
const Store = TrebleGSM.Store<StoreProps, Features<StoreProps, any>>();
Store.addItem({
    key: "state1",
    state: "stateValue1"
});
Store.addItem({
    key: "state2",
    state: "stateValue2"
});
Store.addItem({
    key: "state3",
    state: "stateValue3"
});

describe("Get initial state from store.", () => {
    it("Test get state method", () => {
        expect(Store.getState('state1')).toBe("stateValue1");
        expect(Store.getState('state2')).toBe("stateValue2");
        expect(Store.getState('state3')).toBe("stateValue3");
    });
});

describe("Set and get new state from store.", () => {
    it("Test get state method", () => {
        Store.setState('state1', 'newStateValue1');
        Store.setState('state2', 'newStateValue2');
        Store.setState('state3', 'newStateValue3');
        expect(Store.getState('state1')).toBe("newStateValue1");
        expect(Store.getState('state2')).toBe("newStateValue2");
        expect(Store.getState('state3')).toBe("newStateValue3");
    });
});