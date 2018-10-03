import React, { Component } from 'react';
import ListRow from './ListRow';
import ListName from './ListName';
import AddRow from './AddRow';

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

    }

    render () {
        const items = this.props.list.items;

        const listItems = items.map(item => {

            if (item.isNeeded) {
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
            return null;
        });

        const reserveItems = items.map(item => {

            if (!item.isNeeded) {
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
            return null;

        });
        return (

            <div>
                <ListName
                    key={this.props.list._id}
                    onListEdit={this.props.onListEdit}
                    listName={this.props.list.listName} />
                <h3>Ostettavat</h3>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Tuote</th>
                            <th scope="col">Kategoria</th>
                            <th scope="col">Ostettu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AddRow onItemAdd={this.props.onItemAdd}/>
                        {listItems}
                    </tbody>
                </table>

                <h3>Tuotereservi</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tuote</th>
                            <th>Kategoria</th>
                            <th>Ostettaviin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveItems}
                    </tbody>
                </table>
                <button onClick={() => this.props.onListDelete(this.props.list._id)}>Poista lista</button>
            </div>

        );
    }

}
