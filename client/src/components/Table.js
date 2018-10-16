import React from 'react';
import AddRow from './AddRow';

export default function Table(props) {

    //this function is used to showing AddRow only in the 'needed' table
    const addRow = () => {
        if(!props.hideAddRow) {
            return (
                <AddRow onItemAdd={props.onItemAdd}/>
            );
        }

    }

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Tuote</th>
                    <th scope="col">Kategoria</th>
                    <th scope="col">Ostettu</th>
                </tr>
            </thead>
            <tbody>
                {addRow()}
                {props.listItems}
            </tbody>
        </table>
    );
}
