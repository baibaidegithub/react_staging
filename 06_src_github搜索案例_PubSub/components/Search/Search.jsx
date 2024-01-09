import React, { Component } from 'react'
import PubSub, { publish } from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    search = () => {
        PubSub.publish('atguigu', { name: 'tom', age: 18 })
        //获取用户的输入
        console.log(this.input1.value)
        //发送请求前通知List更新状态
        PubSub.publish('atguigu', { isFirst: false, isLoading: true })
        //发送网络请求
        //api1必须跟在3000端口号后面 是前缀
        axios.get(`http://localhost:3000/api1/search/users?q=${this.input1.value}`).then(
            response => {
                //请求成功后通知List更新状态
                PubSub.publish('atguigu', { isLoading: false, users: response.data.items })
                console.log(response.data.items)
            },
            error => {
                //请求失败后通知List更新状态
                PubSub.publish('atguigu', { isLoading: false, err: error.message })
            }
        )
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={(currentNode) => { this.input1 = currentNode }} type="text" placeholder="enter the name you search" />&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
