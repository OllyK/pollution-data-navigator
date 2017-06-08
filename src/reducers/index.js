import { combineReducers } from 'redux';
import { cities, location, measurement, itemsHasErrored, itemsIsLoading, areaSelected, measurementSelected } from './items';

export default combineReducers({
    cities,
    location,
    measurement,
    itemsHasErrored,
    itemsIsLoading,
    areaSelected,
    measurementSelected
});
