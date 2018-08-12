import React, { Component } from 'react';
// import './App.css'; //file deleted for now
import SelectList from './components/SelectList';
import List from './components/List';
import AddItem from './components/addItem'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =    {   lists: null,
                            selectedListId: null
                        };

    this.selectList = this.selectList.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.createList = this.createList.bind(this);
    this.onListDelete = this.onListDelete.bind(this);
    }

    componentDidMount() {
        this.getShoppingLists();
    }

    selectList(id) {
        this.setState({selectedListId: id});
    }

//TODO: updateStateLists does not work the way it is used here.
// need to do something else. List create throws now, but list
// is created anyhow
    createList(data) {
        const url = `/shoppinglist`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        // .then(this.getShoppingLists());
        .then(list => {
            console.log(list);
            // const newState = this.state.lists.push(list);
            // console.log(newState);
            this.setState({ lists: [...this.state.lists, list], selectedListId: list._id });
        });
        // .then(list => {
        //     this.updateStateLists(list);
        //     this.selectList(list._id);
        //     console.log(list, this.state.selectedListId);
        // });
    }

    getShoppingLists(listId) {
        fetch('/shoppinglist')
            .then(res => res.json())
            .then(lists => {
                const _listId = listId || lists[0]._id;
                this.setState({ lists: lists, selectedListId: _listId });
            })
            .then(() => {
                    console.log(this.state.lists);
                    console.log(this.state.selectedListId);
                });
    }

    onListDelete() {
        const url = `/shoppinglist/${this.state.selectedListId}`;
        fetch(url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
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
    // sample url:
    // /shoppinglist/5b3b4c0915981d32d8a25685/items/5b3ca58e407cd01210835c7e
    onItemEdit(itemId, data) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/${itemId}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    onItemDelete(itemId) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/${itemId}`;
        fetch(url, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    onItemAdd(data) {
        const url = `/shoppinglist/${this.state.selectedListId}/items/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
    }

    render() {
        if(!this.state.lists || !this.state.selectedListId) return <div>Ladataan...</div>;

        const list = this.state.lists.find(obj => {return obj._id === this.state.selectedListId});

        return (
            <div>
                <SelectList
                    selectedList={this.state.selectedListId}
                    createList={this.createList}
                    onSelectChange={this.selectList}
                    lists={this.state.lists} />
                <AddItem
                    onItemAdd={this.onItemAdd}/>
                <List
                    onListDelete={this.onListDelete}
                    onItemAdd={this.onItemAdd}
                    onItemDelete={this.onItemDelete}
                    onItemEdit={this.onItemEdit}
                    list={list}
                    selectedList={this.state.selectedListId} />
            </div>
        );
    }
}
