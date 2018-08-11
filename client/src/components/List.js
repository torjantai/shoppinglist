import React from 'react';
import ListRow from './ListRow';

export default function List(props) {
    if (!props.list) return <div>ladataan</div>;


    const items = props.list.items;
    console.log(items);
    if (!items) return <div>missä lista?</div>

    const listItems = items.map(item => {

        if (item.isNeeded) {
            return (
                <ListRow
                    onItemDelete={props.onItemDelete}
                    onItemEdit={props.onItemEdit}
                    item={item}
                    key={item._id}/>
            );
        }
        return null;
    });

    const reserveItems = items.map(item => {

        if (!item.isNeeded) {
            return (
                <tr key={item._id}>
                    <td>
                        {item.article}
                    </td>
                    <td>
                        {item.category}
                    </td>
                    <td><button onClick={() => props.onItemEdit(item._id,
                        {isNeeded: true })}>Siirrä</button></td>
                    <td><button onClick={() => props.onItemDelete(item._id)}>Poista</button></td>
                </tr>
            );
        }
        return null;

    });

    return (
        <div>
            <h2>{props.list.listName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tuote</th>
                        <th>Kategoria</th>
                        <th>Ostettu</th>
                        <th>Poista</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>

            <h3>Tuotereservi</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tuote</th>
                        <th>Kategoria</th>
                        <th>Siirrä ostettaviin</th>
                        <th>Poista</th>
                    </tr>
                </thead>
                <tbody>
                    {reserveItems}
                </tbody>
            </table>
        </div>

    );
}
