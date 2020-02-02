import {useState, useReducer, useEffect} from 'react';
import {getGifs, getStickers} from "../../api/apiGiphy";

const SET_ITEMS = 'SET-ITEMS';
const ADD_ITEMS = 'ADD-ITEMS';
const CLEAR_ITEMS = 'CLEAR-ITEMS';

const initialState = {
    items: []
};

export const setItems = items => ({type: SET_ITEMS, items});
const addItems = items => ({type: ADD_ITEMS, items});
export const clearItems = () => ({type: CLEAR_ITEMS});

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: action.items
            };
        case ADD_ITEMS:
            return {
                ...state,
                items: [...state.items, ...action.items]
            };
        case CLEAR_ITEMS:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export const useGifSearch = () => {
    const [query, setQuery] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [onScroll, setOnScroll] = useState(false);
    const [isTrending, setIsTrending] = useState(true);
    const [stickers, setStickers] = useState(false);
    const [newestSort, setNewestSort] = useState(false);
    const [playMode, setPlayMode] = useState('default');
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const getNextItems = (apiGetItems, ...params) => {
            apiGetItems(...params)
                .then(response => {
                    dispatch(addItems(response.data.data));
                    setOnScroll(false);
                });
        };
        const getItems = (apiGetItems, ...params) => {
            apiGetItems(...params)
                .then(response => {
                    dispatch(setItems(response.data.data));
                    setIsFetching(false);
                });
        };
        if (onScroll) {
            if (!stickers) {
                getNextItems(getGifs, query, state.items.length);
            } else {
                getNextItems(getStickers, query, state.items.length);
            }
        }
        if (isFetching) {
            if (!stickers) {
                getItems(getGifs, query);
            } else {
                getItems(getStickers, query);
            }   
        }
    }, [isFetching, onScroll]);

    return {
        query,
        setQuery,
        setIsFetching,
        setOnScroll,
        isTrending,
        setIsTrending,
        stickers,
        setStickers,
        newestSort,
        setNewestSort,
        playMode,
        setPlayMode,
        state,
        dispatch
    };
};