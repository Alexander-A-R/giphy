import React, {useEffect} from 'react';
import GifsPage from "./GifsPage/GifsPage";
import {getGifs, getStickers, getTrendingGifs} from "../../api/apiGiphy";
import style from './GifSearch.module.css';
import {clearItems, setItems, useGifSearch} from "./useGifSearch";
import TrendingGifs from "./TrendingGifs/TrendingGifs";

const GifSearch = () => {

    const {query, setQuery, setIsFetching, setOnScroll, isTrending, setIsTrending,
        stickers, setStickers, newestSort, setNewestSort, playMode, setPlayMode, state, dispatch} = useGifSearch();

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onInputChange = (e) => {
        setQuery(e.target.value);
    };

    const onScroll = (e) => {
        if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 400) {
            setOnScroll(true);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isTrending) setIsTrending(false);
        dispatch(clearItems());
        const request = stickers ? getStickers(query) : getGifs(query);
        request.then(response => {
                dispatch(setItems(response.data.data));
            });
    };

    const sortItems = (data) => {
        if (!newestSort) {
            return data;
        }
        const sortNewestFunction = (itemA, itemB) => {
            if (Date.parse(itemA.import_datetime) < Date.parse(itemB.import_datetime)) return 1;
            if (Date.parse(itemA.import_datetime) === Date.parse(itemB.import_datetime)) return 0;
            if (Date.parse(itemA.import_datetime) > Date.parse(itemB.import_datetime)) return -1;
        };
        return [...data].sort(sortNewestFunction);
    };

    return <div>
        <div className={style.form}>
            <form onSubmit={submit}>
                <input type="text" name={'query'} placeholder={'Искать...'} value={query} onChange={onInputChange} className={style.input}/>
                <button type={'submit'} className={style.button}>Поиск</button>
            </form>
        </div>
        {isTrending
            ? <TrendingGifs items={state.items} dispatch={dispatch} setItems={setItems}/>
            : <GifsPage items={sortItems(state.items)}
                        setIsFetching={setIsFetching}
                        newestSort={newestSort}
                        setNewestSort={setNewestSort}
                        stickers={stickers}
                        setStickers={setStickers}
                        playMode={playMode}
                        setPlayMode={setPlayMode} />}
    </div>
};

export default GifSearch;