import React from 'react';

export default function List(props) {

    const items = props.list.items;
    console.log(items);
    if (!items) return <div>missä lista?</div>

    // if(!list) return <div>Loading</div>
    // function renderList(list) {
    //     return (
    //
    //     );
    // }
    const listItems = items.map(item => {

        if (item.isNeeded) {
            return (
                <tr key={item._id}>
                    <td>{item.article}</td>
                    <td>{item.category}</td>
                    <td><button onClick={() => props.onItemSetNeeded(item._id, {isNeeded: false })}>Ostettu</button></td>
                    <td><button>Poista</button></td>
                </tr>
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
                    <td><button onClick={() => props.onItemSetNeeded(item._id, {isNeeded: true })}>Siirrä</button></td>
                    <td><button>Poista</button></td>
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
                    <tr>
                        <td>
                            <input type="text" placeholder="Tuote" />
                        </td>
                        <td>
                            <input type="text" placeholder="Kategoria" />
                        </td>
                        <td>
                            <button>Lisää</button>
                        </td>
                    </tr>

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
