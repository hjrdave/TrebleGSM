/*
    Shallow Compare
    - Does a shallow comparison of objects
*/

interface IShallowCompare{
    (
        dispatchValue: {[key: string]: any},
        currentState: {[key: string]: any}
    ): boolean
}

const shallowCompare: IShallowCompare = (dispatchValue, currentState) => {

  const keys1 = Object.keys(dispatchValue);
  const keys2 = Object.keys(currentState);

  if (keys1.length !== keys2.length) {
    return true;
  }

  for (let key of keys1) {
    if (dispatchValue[key] !== currentState[key]) {
      return true
    }
  }
  return false
}

export default shallowCompare