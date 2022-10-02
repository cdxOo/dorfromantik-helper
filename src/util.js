import types from './edge-types';

export const rotate = (that) => {
    var clone = [ ...that ];
    var head = clone.shift();
    clone.push(head);
    return clone.join('');
}

export const convertEdgeType = (type) => {
    if (type.length === 1) {
        return Object.keys(types).find(it => it.startsWith(type));
    }
    else {
        return type[0];
    }
}

export const convertEdgeState = (that) => {
    if (typeof that === 'string') {
        return [...that].reduce((acc, it, ix) => ({
            ...acc, [ix]: it
        }), {})
    }
    else {
        return [0,1,2,3,4,5].reduce((acc, ix) => (
            acc + convertEdgeType(that[ix])
        ), '')
    }
}
