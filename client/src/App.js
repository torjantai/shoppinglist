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
        if (this.state.username) {
            this.getShoppingLists();
        }
    }

    // conponentDidUpdate() {
    //     if (this.state.userName) {
    //         this.getShoppingLists();
    //     }
    // }

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
        fetch(`/shoppinglist/${this.state.username}`, {
            method: 'get',
            headers: new Headers({
                'Authorization': this.state.jwt,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {

                    const _listId = listId || data.lists[0]._id;
                    this.setState({ lists: data.lists, selectedListId: _listId });

            })
            .catch(error => console.error('Error:', error))
            .then(() => {
                    console.log(this.state.lists);
                    console.log(this.state.selectedListId);
                });
    }

    onListDelete = () => {

        const url = `/shoppinglist/${this.state.username}/${this.state.selectedListId}`;
        fetch(url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(lists => { this.setState({
            lists: lists, selectedListId: lists[0]._id
            });
        });
    }

    //helper function to update state when only one of the lists is changed
    updateStateLists = (newData) => {
        const arrayIndex = this.state.lists.findIndex(x => x._id === this.state.selectedListId);
        this.setState({
            lists: [
                ...this.state.lists.slice(0, arrayIndex),
                Object.assign({}, this.state.lists[arrayIndex], newData),
                ...this.state.lists.slice(arrayIndex + 1)
            ]
        });
    }
    onListEdit = (data) => {
        console.log('app - onListEdit');
        const url = `/shoppinglist/${this.state.selectedListId}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Authorization': this.state.jwt,
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }



    render() {
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
