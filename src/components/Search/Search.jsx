import React, { Component } from 'react'
import PubSub, { publish } from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    search = async () => {
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
        

        //发送网络请求---使用fetch发送（未优化）
        /*
        fetch(`http://localhost:3000/api1/search/users?q=${this.input1.value}`).then(
            response => {
                console.log('联系服务器成功了');
                return response.json()
            },
            error => {
                console.log('联系服务器失败了', error);
                return new Promise(() => { })
            },
        ).then(
            response => { console.log('获取数据成功了', response); },
            error => { console.log('获取数据失败了', error) }
        )
        */

        //发送网络请求---使用fetch发送（优化）
        /*
        fetch(`http://localhost:3000/api1/search/users?q=${this.input1.value}`).then(
            response => {
                console.log('联系服务器成功了');
                return response.json()
            },
        ).then(
            response => {
                console.log('获取数据成功了', response);
            }
        ).catch(
            (error) => {
                console.log('请求出差', error);
            }
        )
        

        try {
            const response = await fetch(`http://localhost:3000/api1/search/users?q=${this.input1.value}`)
            const data = await response.json()
            console.log(data)
            PubSub.publish('atguigu', { isLoading: false, users: data.item })
        } catch (error) {
            console.log('请求出错', error);
            PubSub.publish('atguigu', { isLoading: false, err: error.message })
        }
        */
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
