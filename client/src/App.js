import React, { Component } from 'react';
// import './App.css'; //file deleted for now
import SelectList from './components/SelectList';
import List from './components/List';
import Login from './components/Login';
// import AddItem from './components/addItem'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =    {   username: null,
                            lists: [],
                            selectedListId: null,
                            jwt: null,
                        };
    }

    componentDidMount() {

        if (window.localStorage.jwt) {
            console.log(window.localStorage);
            this.setState({
                username: window.localStorage.getItem('username'),
                jwt: `Bearer ${window.localStorage.getItem('jwt')}`
            }, () => {
                this.getShoppingLists();
            });

        }
    }

    //stores JWT and username to localStorage
    storeJWT = (token, username) => {
        const storage = window.localStorage;
        storage.setItem('jwt', token);
        storage.setItem('username', username);
    }

    login = (username, password) => {
        const url = `/login`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({userName: username, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            this.storeJWT(data.token, username);
            this.setState({ username: username, jwt: `Bearer ${data.token}`}, () => {
                console.log(this.state);
                this.getShoppingLists();
            });
        })
    }

    selectList = (id) => {
        this.setState({ selectedListId: id });
    }

    createList = (data) => {
        const url = `/shoppinglist/${this.state.username}`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Authorization': this.state.jwt,
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            console.log(data);
            this.setState({ lists: data.lists, selectedListId: data.lists[0]._id });
        });

    }

    getShoppingLists = (listId) => {
        console.log('getShoppingLists state:', this.state);
        fetch(`/shoppinglist/${this.state.username}`, {
            method: 'get',
            headers: new Headers({
                'Authorization': this.state.jwt,
                'Content-Type': 'application/json'
                })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                    const _listId = listId || data.lists[0]._id;
                    this.setState({ lists: data.lists, selectedListId: _listId });
            })
            .catch(error => console.error('Error:', error))
            .then(() => {
                    console.log(this.state);
                });
    }

    onListDelete = () => {
        const url = `/shoppinglist/${this.state.username}/${this.state.selectedListId}`;
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': this.state.jwt,
                'Content-Type': 'application/json'
                })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                this.setState({
                    lists: data.lists,
                    selectedListId: data.lists[0]._id
                });
            });
    }


    onItemAdd = (itemObj) => {
        this.setState(prevState => {
            const lists = prevState.lists.slice();
            const list = lists.find(list => list._id === prevState.selectedListId);
            list.items.unshift(itemObj);
            return { lists };
        });
    }

    onItemDelete = (itemObj) => {
        this.setState(prevState => {
            const lists = prevState.lists.slice();
            const list = lists.find(list => list._id === prevState.selectedListId);
            const index = list.items.findIndex(item => itemObj.article === item.article
                && itemObj.category === item.category);
            list.items.splice(index, 1);
            return { lists };
        });
    }



    render() {
        console.log('app render', this.state);
        if(this.state.lists.length === 0 || !this.state.selectedListId) {
             return <Login login={this.login}/>;
        }

        const list = this.state.lists.find(obj => {
                            return obj._id === this.state.selectedListId
                        });

        return (
            <div className="bg-light mt-5 p-3">

                <SelectList
                    selectedList={this.state.selectedListId}
                    createList={this.createList}
                    onSelectChange={this.selectList}
                    lists={this.state.lists}
                />

                <List
                    onListEdit={this.onListEdit}
                    onListDelete={this.onListDelete}
                    onItemAdd={this.onItemAdd}
                    onItemDelete={this.onItemDelete}
                    onItemEdit={this.onItemEdit}
                    list={list}
                    selectedList={this.state.selectedListId}
                />
            </div>
        );
    }
}
