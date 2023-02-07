import createStore from '../../../create-store';

const TrebleCoreStore = createStore([
    {
        action: 'updateTrebleCoreData',
        state: {
            trebleCoreData: {
                subscribeAPI: null,
                moduleData: null
            }
        }
    },
    {
        action: 'runTrebleCoreMiddleware',
        state: {
            trebleCoreMiddleware: true
        }
    }
]);

export default TrebleCoreStore