import TrebleGSM from './TrebleGSM';
import Features from './Features';

interface StoreProps {
    state1: string;
    state2: number;
    state3: boolean;
    state4: { [key: string]: any };
    state5: string[];
    state6: { [key: string]: { [key: string]: any } }
    onLoadTest: string;
    onLoadTest2: string;
    onRunTest: string;
}
const Store = TrebleGSM.Store<StoreProps, Features<StoreProps, any>>();
Store.addItem({
    type: "string",
    key: "state1",
    state: "stateValue1"
});
Store.addItem({
    type: "number",
    key: "state2",
    state: 10
});
Store.addItem({
    type: "boolean",
    key: "state3",
    state: false
});
Store.addItem({
    type: "object",
    key: "state4",
    state: { foo: "stateValue3" }
});
Store.addItem({
    type: "array",
    key: "state5",
    state: ["foo", "foo2"]
});
Store.addItem({
    type: "deepObject",
    key: "state6",
    state: { foo: { foo2: "stateValue6" } }
});

describe("Get initial state from store.", () => {
    it("Test get state method", () => {
        expect(Store.getState('state1')).toBe("stateValue1");
        expect(Store.getState('state2')).toBe(10);
        expect(Store.getState('state3')).toBe(false);
        expect(Store.getState('state4')).toStrictEqual({ foo: "stateValue3" });
        expect(Store.getState('state5')).toStrictEqual(["foo", "foo2"]);
        expect(Store.getState('state6')).toStrictEqual({ foo: { foo2: "stateValue6" } });
    });
});

describe("Set and get new state from store.", () => {
    it("Test set state method", () => {
        Store.setState('state1', 'newStateValue1');
        Store.setState('state2', 20);
        Store.setState('state3', true);
        Store.setState('state4', { foo: "newStateValue3" });
        Store.setState('state5', ["fee", "moo"]);
        Store.setState('state6', { foo: { foo2: "stateValue7" } });
        expect(Store.getState('state1')).toBe("newStateValue1");
        expect(Store.getState('state2')).toBe(20);
        expect(Store.getState('state3')).toBe(true);
        expect(Store.getState('state4')).toStrictEqual({ foo: "newStateValue3" });
        expect(Store.getState('state5')).toStrictEqual(["fee", "moo"]);
        expect(Store.getState('state6')).toStrictEqual({ foo: { foo2: "stateValue7" } });
    });
});
Store.addItem({
    key: "onLoadTest2",
    state: "pizza",
});
Store.addItem({
    key: "onLoadTest",
    state: "apple",
    features: {
        onLoad: (parcel, setState) => {
            setState('onLoadTest', 'grape');
            setState('onLoadTest2', 'pie');
        }
    }
});


describe("Test onLoad Middleware function", () => {
    it("Does onLoad run when new state is added to store?", () => {
        expect(Store.getState('onLoadTest')).toBe('grape');
    });
    it("Set another state items state?", () => {
        expect(Store.getState('onLoadTest2')).toBe('pie');
    });
});

Store.addItem({
    key: "onRunTest",
    state: "Mario",
    features: {
        onRun: (parcel) => {
            parcel.setNextState(`Super ${parcel.getDispatchState()}`)
        }
    }
});

describe("Test onRun Middleware function", () => {
    it("Should transform state when state is set", () => {
        Store.setState('onRunTest', 'Luigi');
        expect(Store.getState('onRunTest')).toBe('Super Luigi');
    });
});