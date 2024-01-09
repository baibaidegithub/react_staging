import React, { Component } from 'react'
import './List.css'

export default class List extends Component {
    render() {
        const {users,isFirst,isLoading,err} = this.props
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
