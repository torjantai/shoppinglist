import React, { Component } from 'react';
// import './App.css'; //file deleted for now
import SelectList from './components/SelectList';
import List from './components/List';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =    {   lists: null,
                            selectedList: null
                        };

    this.selectList = this.selectList.bind(this);
    this.onItemSetNeeded = this.onItemSetNeeded.bind(this);
    }

    componentDidMount() {
        this.getShoppingLists();

        // console.log(list);
    }

    selectList(id) {
        console.log(this.state.lists);
        console.log(id);
        const list = this.state.lists.find(function(obj) {return obj._id === id} );
        this.setState({selectedList: list});
        console.log(this.state.selectedList);
    }

    getShoppingLists() {
        fetch('/shoppinglist')
            .then(res => res.json())
            .then(lists => this.setState({ lists: lists }))
            .then(() => this.selectList(this.state.lists[0]._id));
    }

    // sample url:
    // /shoppinglist/5b3b4c0915981d32d8a25685/items/5b3ca58e407cd01210835c7e
    onItemSetNeeded(itemId, data) {
        const url = `/shoppinglist/${this.state.selectedList._id}/items/${itemId}`;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'},
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => this.setState({selectedList: res}));
        // .then(res => console.log('Success:', res));

    }

    render() {
        if(!this.state.lists || !this.state.selectedList) return <div>Ladataan...</div>

        return (
            <div>
                <SelectList
                    onSelectChange={this.selectList}
                    lists={this.state.lists} />
                <List
                    onItemSetNeeded={this.onItemSetNeeded}
                    list={this.state.selectedList} />
            </div>
        );
  }
}
