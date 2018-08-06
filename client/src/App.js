import React, { Component } from 'react';
// import './App.css'; //file deleted for now
import SelectList from './components/SelectList';
import List from './components/List';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =    {   lists: null,
                            selectedListId: null
                        };

    this.selectList = this.selectList.bind(this);
    this.onItemSetNeeded = this.onItemSetNeeded.bind(this);
    }

    componentDidMount() {
        this.getShoppingLists();


    }

    selectList(id) {
        // console.log(this.state.lists);
        // console.log(id);
        // const list = this.state.lists.find(function(obj) {return obj._id === id} );
        this.setState({selectedListId: id});
        // console.log(this.state.selectedList);
    }

    getShoppingLists() {
        fetch('/shoppinglist')
            .then(res => res.json())
            .then(lists => this.setState({ lists: lists, selectedListId: lists[0]._id }))
            .then(() => {
                    console.log(this.state.lists);
                    console.log(this.state.selectedListId);
                });
            // .then(() => this.selectList(this.state.lists[0]._id));
    }

    updateStateLists(newData) {
        const arrayIndex = this.state.lists.findIndex(x => x._id === this.state.selectedListId);
        console.log(arrayIndex);
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
    onItemSetNeeded(itemId, data) {

        const url = `/shoppinglist/${this.state.selectedListId}/items/${itemId}`;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(list => this.updateStateLists(list));
        // .then(list => this.setState({lists: list}));
        // .then(res => console.log('Success:', res));

    }

    render() {
        if(!this.state.lists || !this.state.selectedListId) return <div>Ladataan...</div>

        return (
            <div>
                <SelectList
                    onSelectChange={this.selectList}
                    lists={this.state.lists} />
                <List
                    onItemSetNeeded={this.onItemSetNeeded}
                    lists={this.state.lists}
                    selectedList={this.state.selectedListId} />
            </div>
        );
  }
}
