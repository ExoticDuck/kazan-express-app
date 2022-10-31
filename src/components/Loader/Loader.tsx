import React from 'react';
import style from './Loader.module.css'

function Loader() {
    return (
        <div className={style.Container}>
            <span className={style.Loader}></span>
        </div>
    )
}

export default Loader