import React, {useRef, useEffect} from 'react';
import style from './TrendingGifs.module.css';
import {getTrendingGifs} from '../../../api/apiGiphy.js';

const TrendingGifs = ({items, dispatch, setItems}) => {

    useEffect(() => {
        getTrendingGifs()
            .then((response) => {
                dispatch(setItems(response.data.data));
            });
    }, []);

    const slideWidth = items.reduce((w, gif) => w + Number(gif.images.fixed_height.width), 0);
    const slide = useRef(null);

    const moveBack = () => {
        const left = parseFloat(slide.current.style.left || 0);
        if (left) {
            if (left > -700) {
                slide.current.style.left = 0 + 'px';
            } else {
                slide.current.style.left = (left + 700) + 'px';
            }
        }
    };

    const moveForward = () => {
        const newPosition = parseFloat(slide.current.style.left || 0) - 700;
        slide.current.style.left = newPosition + 'px';
        console.log(-slideWidth + document.body.clientWidth);
        if (newPosition < (-slideWidth + document.body.clientWidth)) {
            slide.current.style.left = (-slideWidth + document.body.clientWidth) + 'px';
        } else {
            slide.current.style.left = newPosition + 'px';
        }
    };

    return <div className={style.slider}>
        <div ref={slide} className={style.slideItem} style={{width: slideWidth + 'px'}}>
            {items.map(gif => {
                return <div key={gif.id} className={style.gif}>
                    <img src={gif.images.fixed_height.url} alt={gif.url} />
                </div>
            })}
        </div>
        {console.log(items)}
        <button className={style.button + ' ' + style.backButton} onClick={moveBack}>&#8249;</button>
        <button className={style.button + ' ' + style.forwadButton} onClick={moveForward}>&#8250;</button>

    </div>
};

export default TrendingGifs;