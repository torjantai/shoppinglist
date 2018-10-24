import React, { Component } from 'react';
// import './App.css'; //file deleted for now
import SelectList from './components/SelectList';
import List from './components/List';
import Login from './components/Login';
// import AddItem from './components/addItem'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =    {   username: '',
                            lists: [],
                            selectedListId: null,
                            jwt: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViY2RiM2M1ZTUzNDk3MDlkNDNhZDc0NyIsInVzZXJOYW1lIjoiemV1cyJ9LCJpYXQiOjE1NDAyMDc1NzF9._Nc8CIXv2unoOtYL0xFglfUZIqUcyibHKSHGv2J5obE"
                        };

    this.selectList = this.selectList.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.createList = this.createList.bind(this);
    this.onListDelete = this.onListDelete.bind(this);
    this.onListEdit = this.onListEdit.bind(this);
    }

    componentDidMount() {
        this.getShoppingLists();
    }

    selectList(id) {
        this.setState({ selectedListId: id });
    }

    createList(data) {
        const url = `/shoppinglist`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => {
            console.log(list);
            this.setState({ lists: this.state.lists.concat(list), selectedListId: list._id });
            // this.setState({ lists: [...this.state.lists, list], selectedListId: list._id });
        });

    }

    getShoppingLists(listId) {
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

    onListDelete() {
        if (this.state.lists.length < 2) return;
        const url = `/shoppinglist/${this.state.selectedListId}`;
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
    updateStateLists(newData) {
        const arrayIndex = this.state.lists.findIndex(x => x._id === this.state.selectedListId);
        this.setState({
            lists: [
                ...this.state.lists.slice(0, arrayIndex),
                Object.assign({}, this.state.lists[arrayIndex], newData),
                ...this.state.lists.slice(arrayIndex + 1)
            ]
        });
    }
    onListEdit(data) {
        console.log('app - onListEdit');
        const url = `/shoppinglist/${this.state.selectedListId}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }
    // sample url:
    // /shoppinglist/5b3b4c0915981d32d8a25685/items/5b3ca58e407cd01210835c7e
    onItemEdit(itemId, data) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/${itemId}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    onItemDelete(itemId) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/${itemId}`;
        fetch(url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    onItemAdd(data) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    render() {
        if(this.state.lists.length === 0 || !this.state.selectedListId) {
             return <Login />;
        }

        const list = this.state.lists.find(obj => {
                            return obj._id === this.state.selectedListId
                        });

        return (
            <div className="bg-light mt-5 p-3">
                <Login />
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
