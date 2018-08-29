import React from 'react';
import ListRow from './ListRow';
import ListName from './ListName';


export default function List(props) {

    const items = props.list.items;

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
                <ListRow
                    onItemDelete={props.onItemDelete}
                    onItemEdit={props.onItemEdit}
                    item={item}
                    key={item._id}/>
            );
        }
        return null;

    });

    return (
        <div>
            <ListName
                onListEdit={props.onListEdit}
                listName={props.list.listName} />
            <h3>Ostettavat</h3>
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
                        <th>Ostettaviin</th>
                        <th>Poista</th>
                    </tr>
                </thead>
                <tbody>
                    {reserveItems}
                </tbody>
            </table>
            <button onClick={() => props.onListDelete(props.list._id)}>Poista lista</button>
        </div>

    );
}
