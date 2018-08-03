import React from 'react';

export default function List({ lists }) {

    function renderList(lists) {
        return (
            <tr>
                <td>
                    {lists[0].items[0].article}
                </td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Tuote</th>
                    <th>Merkitse ostetuksi</th>
                </tr>
            </thead>
            <tbody>
                {renderList(lists)}
            </tbody>

        </table>
    );
}
