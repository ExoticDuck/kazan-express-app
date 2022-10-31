import React from 'react'
import style from './Shop.module.css'

type ShopPropsType = {
    id: number,
    title: string,
    key: any
}

function Shop(props: ShopPropsType) {
  return (
    <div className={style.Container}>{props.title}</div>
  )
}

export default Shop