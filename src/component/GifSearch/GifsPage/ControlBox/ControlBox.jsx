import React, {useState, useEffect} from 'react';
import style from "./ControlBox.module.css";

const ControlBox = props => {

    const [fixed, setFixed] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onScroll = () => {
        if (window.pageYOffset > 120) {
            setFixed(style.controlBox_fixed);
        } else {
            setFixed('');
        }
    };

    const setGifsClick = () => {
        if (props.stickers) {
            props.setStickers(false);
            props.setIsFetching(true);
        }
    };

    const setStickersClick = () => {
        if (!props.stickers) {
            props.setStickers(true);
            props.setIsFetching(true);
        }
    };

    const newestSortClick = () => {
        if (!props.newestSort) {
            props.setNewestSort(true);
        }
    };

    const relevantSortClick = () => {
        if (props.newestSort) {
            props.setNewestSort(false);
        }
    };

    const clickPlay = () => {
        if (props.playMode !== 'play') {
            props.setPlayMode('play');
        }
    };

    const clickPause = () => {
        if (props.playMode !== 'pause') {
            props.setPlayMode('pause');
        }
    };

    const toggleStyle = props.playMode === 'play' ? style.playToggle : props.playMode === 'pause' ? style.pauseToggle : '';

    return <div className={style.controlBox + ' ' + fixed}>
        <div>
            <button onClick={setGifsClick}
                    className={`${style.button} ${props.stickers ? '' : style.buttonActive}`}
            >
                GIFs
            </button>
            <button onClick={setStickersClick}
                    className={`${style.button} ${props.stickers ? style.buttonActive : ''}`}
            >
                Stickers
            </button>
        </div>
        <div className={style.rightBlock}>
            <div>
                <span>Sort: </span>
                <span className={`${style.sortButton} ${props.newestSort ? '' : style.sortActive}`}
                      onClick={relevantSortClick}>
                Relevant</span>
                <span className={`${style.sortButton} ${props.newestSort ? style.sortActive : ''}`}
                      onClick={newestSortClick}>
                Newest</span>
            </div>
            <div className={style.stopPauseButtons}>
                <div className={`${toggleStyle} ${style.buttonToggle}`}/>
                <button className={`${style.play} ${style.controlButton}`} onClick={clickPlay} />
                <button className={`${style.pause} ${style.controlButton}`} onClick={clickPause} />
            </div>
        </div>
    </div>
};

export default ControlBox;