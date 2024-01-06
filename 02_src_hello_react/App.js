//创建“外壳”组件App

import React, {Component} from 'react'

//引入js或者jsx文件时可以不写后缀
import Hello from './components/Hello/Hello'
import Welcome from './components/Welcome/Welcome'

//创建并暴露App组件
export default class App extends Component{
    render(){
        return(
            <><Hello /><Welcome /></>
        )
    }
}

