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

    }

    componentDidMount() {
        this.getShoppingLists();

        // console.log(list);
    }

    selectList(lists, id) {
        const list = lists.find(function(obj) {return obj._id === id} );
        this.setState({selectList: list});
        console.log(list);
    }

    getShoppingLists() {
        fetch('/shoppinglist')
            .then(res => res.json())
            .then(lists => this.setState({
                lists: lists
            }))
            .then(() => this.selectList(this.state.lists, this.state.lists[0]._id));


    }


    render() {
        if(!this.state.lists) return <div>Ladataan kauppalistoja...</div>

        return (
            <div>
                <SelectList lists={this.state.lists} />
                <List lists={this.state.lists} />
            </div>
        );
  }
}
