export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function citiesFetchDataSuccess(items) {
    return {
        type: 'CITIES_FETCH_DATA_SUCCESS',
        citiesList: items
    };
}

export function locationFetchDataSuccess(items) {
    return {
        type: 'LOCATION_FETCH_DATA_SUCCESS',
        locationInfo: items
    };
}

export function measurementFetchDataSuccess(items) {
    return {
        type: 'MEASUREMENT_FETCH_DATA_SUCCESS',
        measurementInfo: items
    };
}

export function areaSelected(value) {
    return {
        type: 'AREA_SELECTED',
        areaSelected: value
    };
}

export function measurementSelected(value) {
    return {
        type: 'MEASUREMENT_SELECTED',
        measurementSelected: value
    };
}

export function itemsFetchData(url, type) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => {
            switch (type) {
                case 'cities':
                  dispatch(citiesFetchDataSuccess(items));
                  break;
                case 'location':
                  dispatch(locationFetchDataSuccess(items));
                  break;
                case 'measurements':
                  dispatch(measurementFetchDataSuccess(items));
                  break;
          }

        })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
