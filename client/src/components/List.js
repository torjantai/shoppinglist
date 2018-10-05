import React, { Component } from 'react';
import ListRow from './ListRow';
import ListName from './ListName';
import AddRow from './AddRow';
import Table from './Table';

export default class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedRow: null,
            prevSelectedRow: null
        }
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onRowSelectChange = this.onRowSelectChange.bind(this);
    }
    onRowSelect(id) {
        this.setState({ selectedRow: id });
    }

    onRowSelectChange() {
        //make it save the last selected row when selection changes
        //maybe only when there has been a change
        //how to check that? Set a state when editing?
    }

    render () {
        const items = this.props.list.items;
        //this function is used to avoid repetition in listItems and reserveItems
        const row = item => {
            return (
                <ListRow
                    onRowSelectChange={this.onRowSelectChange}
                    selectedRow={this.state.selectedRow}
                    onRowSelect={this.onRowSelect}
                    onItemDelete={this.props.onItemDelete}
                    onItemEdit={this.props.onItemEdit}
                    item={item}
                    key={item._id}
                />
            );
        }
        //create an array of items that will be listed on the 'needed'
        //part of the shoppinglist
        const listItems = items.map(item => {

            if (item.isNeeded) {
                return row(item);
            }
            return null;
        });
        //create an array of reserved items
        const reserveItems = items.map(item => {

            if (!item.isNeeded) {
                return row(item);
            }
            return null;

        });
        return (
            <div>
                <ListName
                    key={this.props.list._id}
                    onListEdit={this.props.onListEdit}
                    listName={this.props.list.listName}
                />

                <h3>Ostettavat</h3>
                <Table
                    listItems={listItems}
                    onItemAdd={this.props.onItemAdd}
                />


                <h3>Tuotereservi</h3>
                <Table
                    listItems={reserveItems}
                    onItemAdd={this.props.onItemAdd}
                />
                <button
                    onClick={() => {
                        this.props.onListDelete(this.props.list._id)
                    }}
                >Poista lista
                </button>
            </div>

        );
    }

}
