import { rotate, convertEdgeState } from './util';

export const tile = (state, action) => {
    var { type, payload } = action;
    
    switch (type) {
        case 'set-edge-type':
            return { ...state, [payload.index]: payload.type };
        case 'reset':
            return tile.defaults;
    }
    throw new Error();

}
tile.defaults = {
    '0': 'any',
    '1': 'any',
    '2': 'any',
    '3': 'any',
    '4': 'any',
    '5': 'any',
}

/*
 { 'CCCNNN': 10 },
 { 'FMTNNN': 5 },
*/
export const openTileTracking = (state, action) => {
    var { type, payload } = action;
    switch (type) {
        case 'add-tile':
            var short = convertEdgeState(payload.tile);
            var rotation = short;
            for (var it of [0,1,2,3,4,5]) {
                var rotation = rotate(rotation);
                if (state[rotation] > 0) {
                    break;
                }
            }
            return { ...state, [rotation]: (state[rotation] || 0) + 1 };
    }
    throw new Error();
}
openTileTracking.defaults = {};
