import React, { Component } from 'react';
import ListRow from './ListRow';
import ListName from './ListName';
import Saver from './Saver';
import Table from './Table';

export default class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedRow: null,
            prevSelectedRow: null
        }
    }
    onRowSelect = (id) => {
        const { selectedRow } = this.state
        if (!selectedRow) {
            this.setState({ selectedRow: id }, () => console.log(this.state));

        } else {
            this.setState({
                    selectedRow: id,
                    prevSelectedRow: selectedRow
                }, () => console.log(this.state));
        }
    }

    render () {
        const items = this.props.list.items;
        //this function is used to avoid repetition in listItems and reserveItems
        const row = item => {
            return (
                <ListRow
                    selectedRow={this.state.selectedRow}
                    onRowSelect={this.onRowSelect}
                    onItemDelete={this.props.onItemDelete}
                    onItemEdit={this.props.onItemEdit}
                    item={item}
                    key={`${item.article}${item.category}${item._id}`}
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
                    onListSave={this.props.onListSave}
                    listName={this.props.list.listName}
                />
                <Saver
                    unSavedChanges={this.props.unSavedChanges}
                    onListSave={this.props.onListSave}
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
                    hideAddRow={true}
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
