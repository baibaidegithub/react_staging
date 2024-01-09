import React, { Component } from 'react'
import PubSub, { publish } from 'pubsub-js'
import './List.css'

export default class List extends Component {

    state = {   //初始化状态
        users: [],  //users初始值为数组
        isFirst: true,   //是否为第一次打开页面s
        isLoading: false,    //标识是否处于加载中
        err: '',   //存储请求相关的错误信息
    }

    //在页面加载时调用这个生命周期函数
    componentDidMount(){
        // _ 可以作为占位符 subscribe第一个参数为订阅名，第二个参数为回调函数，里面放具体数据
        this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
            this.setState(stateObj)
        })
    }

    //组件将要被卸载时触发的生命周期钩子函数
    componentWillUnmount(){
        //取消订阅
        PubSub.unsubscribe(this.token)
    }

    render() {
        const {users,isFirst,isLoading,err} = this.state
        console.log("..................")
        console.log(users)
        console.log(isFirst)
        return (
            <div className="row">
                {
                    //三目运算符可以连着接代替if判断，因为jsx里面只能写表达式
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
                    isLoading ? <h2>loading....</h2> :
                    err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a href={userObj.html_url} target="_blank" rel="noreferrer">
                                    <img alt="head_protrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })

                }

            </div>
        )
    }
}
