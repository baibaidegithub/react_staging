import React, { Component } from 'react'

import axios from 'axios'

export default class Search extends Component {
    search = () => {
        //获取用户的输入
        console.log(this.input1.value)
        //发送请求前通知App更新状态
        this.props.updateAppState({ isFirst: false, isLoading: true })
        //发送网络请求
        //api1必须跟在3000端口号后面 是前缀
        axios.get(`http://localhost:3000/api1/search/users?q=${this.input1.value}`).then(
            response => {
                //请求成功后通知App更新状态
                this.props.updateAppState({ isLoading: false, users: response.data.items })
                console.log(response.data.items)
            },
            error => {
                //请求失败后通知App更新状态
                this.props.updateAppState({ isLoading: false, err: error.message })
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
