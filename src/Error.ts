import { Types } from "./TypeGaurd";

export type ErrorCode = 'WrongType' | "StateDidNotChange" | "StateDoesNotExist";

export default class Error<TKey = string> {

    private code: ErrorCode;
    private stateKey?: TKey;
    private stateType?: Types;
    private msg?: string;
    getMsg() {
        const message = {
            ['WrongType']: `TrebleGSM: State "${this.stateKey}" must be of type "${this.stateType}". This occurs when the wrong type is passed to a "setState" method. To resolve please make sure only specified types are set, or remove the "type" prop from store item.`,

            ['StateDidNotChange']: `TrebleGSM: The dispatched state for "${this.stateKey}" is the same as the current store state. If this is a non primitive type and should render please remove "type" prop from store item".`,

            ['StateDoesNotExist']: `TrebleGSM: State "${this.stateKey}" does not exist. Make sure state was set in Store before "getState" or "setState" methods are called.`
        }
        const msg = message[this.code];
        this.msg = msg;
        return msg;
    }
    getCode() {
        return this.code;
    }
    throwConsoleError() {
        console.error(this.msg);
    }


    constructor(props: { code: ErrorCode, key?: TKey, type?: Types }) {
        this.code = props.code;
        this.stateKey = props.key;
        this.stateType = props.type;
    }
};


