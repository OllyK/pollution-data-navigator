import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { cities, location, measurement, itemsHasErrored, itemsIsLoading, areaSelected, measurementSelected } from './items';

export default combineReducers({
    cities,
    location,
    measurement,
    itemsHasErrored,
    itemsIsLoading,
    areaSelected,
    measurementSelected,
    form: formReducer
});
