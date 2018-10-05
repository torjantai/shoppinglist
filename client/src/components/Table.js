import React from 'react';
import AddRow from './AddRow';

export default function Table(props) {
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
                <AddRow onItemAdd={props.onItemAdd}/>
                {props.listItems}
            </tbody>
        </table>
    );
}
