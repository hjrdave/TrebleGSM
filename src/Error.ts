import { Types } from "./TypeGuard";

export enum ErrorCodes {
    WrongType = 'WrongType',
    StateDidNotChange = 'StateDidNotChange',
    StateDoesNotExist = 'StateDoesNotExist',
    StateAlreadyExists = 'StateAlreadyExists'
}

export default class Error<TKey = string> {

    private code: ErrorCodes;
    private stateKey?: TKey;
    private stateType?: keyof typeof Types;
    private msg?: string;
    getMsg() {
        const message = {
            [ErrorCodes.WrongType]: `TrebleGSM: State "${this.stateKey}" must be of type "${this.stateType}". This occurs when the wrong type is passed to a "setState" method. To resolve please make sure only specified types are set, or remove the "type" prop from store item.`,

            [ErrorCodes.StateDidNotChange]: `TrebleGSM: The dispatched state for "${this.stateKey}" is the same as the current store state. If this is a non primitive type and should render please remove "type" prop from store item".`,

            [ErrorCodes.StateDoesNotExist]: `TrebleGSM: State "${this.stateKey}" does not exist. Make sure state was set in Store before "getState" or "setState" methods are called.`,

            [ErrorCodes.StateAlreadyExists]: `TrebleGSM: State "${this.stateKey}" already exists. State keys must be unique. Please update key to be unique.`
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


    constructor(props: { code: ErrorCodes, key?: TKey, type?: keyof typeof Types }) {
        this.code = props.code;
        this.stateKey = props.key;
        this.stateType = props.type;
    }
};


