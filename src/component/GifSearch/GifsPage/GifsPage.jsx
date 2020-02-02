import React, {useEffect} from 'react';
import style from './GifsPage.module.css';
import GifElement from "../GifElement/GifElement";
import ControlBox from "./ControlBox/ControlBox";

const GifsPage = props => {

    let left = -200;

    const calcTop = index => {
        if (index < 4) {
            return 5;
        }
        let top = 0;
        let nextIndex = index - 4;
        while (true) {
            if (nextIndex >= 0) {
                top += Number(props.items[nextIndex].images.fixed_width.height);
                nextIndex -= 4;
            } else {
                return top;
            }
        }
    };

    const calcLeft = () => {
        if (left === 600) {
            left = 0;
            return left;
        }
        return left += 200;
    };

    const calcPageHeight = () => {
        if (props.items.length === 0) {
            return 0;
        }
        const lastIndex = props.items.length - 1;
        const firstIndex = lastIndex - 3;
        let pageHeight = 0;

        for (let i = firstIndex; i <= lastIndex; i++) {
            const columnHeight = calcTop(i) + Number(props.items[i].images.fixed_width.height);
            if (columnHeight > pageHeight) {
                pageHeight = columnHeight;
            }
        }
        return pageHeight;
    };

    const displaySrc = (playMode, gifData) => {
        if (playMode === 'pause') {
            return gifData.images.fixed_width_still.url;
        } else {
            return gifData.images.fixed_width.url;
        }
    };

    return <div>
        <ControlBox stickers={props.stickers} setStickers={props.setStickers}
                    newestSort={props.newestSort} setNewestSort={props.setNewestSort}
                    playMode={props.playMode} setPlayMode={props.setPlayMode} setIsFetching={props.setIsFetching}/>

        <div className={style.page} style={{height: calcPageHeight() + 'px'}}>
            {props.items.map((gif, index) => {
                return <GifElement key={gif.id}
                                   id={gif.id}
                                   src={displaySrc(props.playMode, gif)}
                                   alt={gif.url}
                                   top={calcTop(index)}
                                   left={calcLeft()}
                />
            })}
        </div>
    </div>
};

export default GifsPage;