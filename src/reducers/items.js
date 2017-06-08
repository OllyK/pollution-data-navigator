export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function cities(state = {}, action) {
    switch (action.type) {
        case 'CITIES_FETCH_DATA_SUCCESS':
            return action.citiesList;
        default:
            return state;
    }
}

export function location(state = {}, action) {
    switch (action.type) {
        case 'LOCATION_FETCH_DATA_SUCCESS':
            return action.locationInfo;
        default:
            return state;
    }
}

export function measurement(state = {}, action) {
    switch (action.type) {
        case 'MEASUREMENT_FETCH_DATA_SUCCESS':
            return action.measurementInfo;
        default:
            return state;
    }
}

export function areaSelected(state = '', action) {
    switch (action.type) {
        case 'AREA_SELECTED':
            return action.areaSelected;
        default:
            return state;
    }
}

export function measurementSelected(state = '', action) {
    switch (action.type) {
        case 'MEASUREMENT_SELECTED':
            return action.measurementSelected;
        default:
            return state;
    }
}
