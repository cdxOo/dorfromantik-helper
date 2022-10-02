import React, { useState, useReducer } from 'react';
import 'reset-css';
import './style.css';
import * as reducers from './reducers';
import types from './edge-types'

export const App = (ps) => {
    var [ state, dispatch ] = useReducer(
        reducers.openTileTracking,
        reducers.openTileTracking.defaults,
    );

    return (
        <div className='d-flex mt-3 ps-5'>
            <div className='w-50'>
                <TileEditor
                    confirmLabel='+ Add Tile'
                    onConfirm={ (tile) => (
                        dispatch({ type: 'add-tile', payload: { tile } })
                    )}
                />
                <pre style={{ border: '1px solid black' }}>
                    { JSON.stringify(state, null, 4)}
                </pre>
            </div>
        </div>
    );
}


const TypeButton = (ps) => {
    var { type, color, isActive, onClick } = ps;
    return (
        <div
            role='button'
            style={{ cursor: 'pointer' }}
            className='d-flex align-items-center mb-2'
            onClick={ onClick }
        >
            <div
                className='flex-grow-0'
                style={{
                    width: '20px',
                    height: '20px',
                    background: color
                }}
            />
            <div className='ps-3'>
                { isActive
                    ? <b><u>{ type }</u></b>
                    : type
                }
            </div>
        </div>
    );
}

const TileEditor = (ps) => {
    var { onConfirm, confirmLabel } = ps;

    var [ activeEdgeType, setActiveEdgeType ] = useState('any');
    var [ state, dispatch ] = useReducer(
        reducers.tile,
        reducers.tile.defaults
    );

    var onClickEdge = (index) => {
        dispatch({ type: 'set-edge-type', payload: {
            index, type: activeEdgeType
        }})
    }

    var onReset = () => {
        dispatch({ type: 'reset' })
    }

    return (
        <div className='d-flex p-3' style={{
            width: '400px', border: '1px solid black'
        }}>
            <div className='w-50'>
                <TileViewer
                    edges={ state }
                    onClickEdge={ onClickEdge }
                />
                <div className='d-flex'>
                    <a className='p-3' onClick={ () => onConfirm(state) }>
                        <b>{ confirmLabel }</b>
                    </a>
                    <a className='p-3'onClick={ () => onReset() }>
                        <b>reset</b>
                    </a>
                </div>
            </div>
            <div>
                { Object.keys(types).map(key => (
                    <TypeButton
                        key={ key }
                        type={ key }
                        color={ types[key] }
                        isActive={ activeEdgeType === key }
                        onClick={ () => setActiveEdgeType(key) }
                    />
                ))}
            </div>
        </div>
    )
}

const TileViewer = (ps) => {
    var { edges, onClickEdge } = ps;

    const positions = [
        { rotate: 0, x: 50, y: 0 },
        { rotate: 60, x: 100, y: 30 },
        { rotate: 120, x: 100, y: 90 },
        { rotate: 180, x: 50, y: 120 },
        { rotate: 240, x: 0, y: 90 },
        { rotate: 300, x: 0, y: 30 },
    ]

    return (
        <div style={{
            width: '165px',
            height: '150px',
            position: 'relative',
            border: '1px solid black'
        }}>
            {[0,1,2,3,4,5].map(ix => (
                <TileEdge
                    key={ ix }
                    type={ edges[ix] }
                    { ...positions[ix] }
                    onClick={ () => onClickEdge(ix) }
                />
            ))}
        </div>
    )
}

const TileEdge = (ps) => {
    var { type, rotate, x, y, onClick } = ps;
    var color = types[type];
    return (
        <div
            onClick={ onClick }
            style={{
                cursor: 'pointer',
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                width: '60px',
                height: '30px',
                transform: `rotate(${rotate}deg)`,
            }} 
        >
            <div style={{
                marginLeft: '15px',
                marginTop: '10px',
                height: '10px',
                width: '30px',
                background: color
            }} />
            <div style={{
                height: '2px',
                width: '60px',
                background: '#dee2e6',
            }} />
        </div>
    )
}
