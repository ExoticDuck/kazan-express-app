import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedShopAC } from '../../../store/reducers/UserReducer'
import style from './Shop.module.css'

type ShopPropsType = {
    id: number,
    title: string,
    key: any, 
    onClick?: () => void
}

function Shop(props: ShopPropsType) {
  let dispatch = useDispatch()

  // function onClickHandler() {
  //   dispatch(setSelectedShopAC(props.id, props.title))
  // }

  return (
    <div className={style.Container} onClick={props.onClick}>{props.title}</div>
  )
}

export default Shop