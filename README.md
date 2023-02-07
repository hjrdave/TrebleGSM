
<!-- <div><img src='https://hjrdave.github.io/get-treble-gsm/static/bd3520df0df3356f8a53c4588b0b285c/f3583/banner-readme.png' /></div>
<p>&nbsp;</p> -->

## Treble Global State Manager

TrebleGSM is a framework agnostic global state manager that makes working with global state in js apps fun.
This is going to replace package 'treble-gsm' (which is React only) in the near future.

This is the core package. Even though this can be used as a stand alone package, it was meant to provide a foundation for Framework specific packages.

1. Create a new `Store`

```javascript

import TrebleGSM from '@treblegsm/core';

export const Store = new TrebleGSM();

```

2. Add initial state to `Store`

```javascript

Store.addItem({
    key: 'name',
    state: 'Ash Ketchum'
});

Store.addItem({
    key: 'age',
    state: 10
});

```

3. Update state

```javascript

Store.setState('name', 'Gary Oak') //key, new state

```

4. Get state

```javascript

Store.getState('name') //key

```

5. Listen for state changes

```javascript

Store.onDispatch((dispatchItem) => {
    if (dispatchItem.key === key) {
        console.log(dispatchItem.state)
    }
});

```
