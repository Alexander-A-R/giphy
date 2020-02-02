import React from 'react';
import style from "./GifElement.module.css";


const GifElement = props => {
    return <div className={style.item} style={{top: `${props.top}px`, left: `${props.left}px`}}>
            <img id={props.id}
                 src={props.src}
                 alt={props.url}
                 onMouseEnter={props.onMouseEnter}
                 onMouseLeave={props.onMouseLeave}
                 className={style.image} />
    </div>
};

export default GifElement;