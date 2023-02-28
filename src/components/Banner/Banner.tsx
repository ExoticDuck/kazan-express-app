import React, { useEffect, useState } from 'react'
import style from './Banner.module.css'


function Banner() {

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return innerWidth;
    }

    const [windowWidth, setWindowWidth] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <div className={windowWidth < 800 ? style.Container : style.ContainerHidden} onClick={(e) => e.stopPropagation()}>
            <div className={style.Text}>
                Раздел “Закупки” не поддерживается на данном устройстве
            </div>
        </div>
    )
}

export default Banner;