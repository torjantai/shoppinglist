import React from 'react';


export default function SelectList(props) {


    const onChange = (event) => {
        if(event.target.value === 'new list') {
            props.createList({
                listName: 'Uusi lista',
                items: [{
                    article: 'Olutta',
                    category: 'Juomat',
                    isNeeded: true
                }]
            });
        } else {
            props.onSelectChange(event.target.value);
        }
    }


        return (
            <form>
                <select
                    className="form-control"
                    value={props.selectedList}
                    onChange={onChange}>

                    {props.lists.map(list => {
                        return (
                            <option
                                value={list._id}
                                key={list._id}>
                                {list.listName}
                            </option>
                        );
                    })}
                    <option value="new list" key="new list">Luo uusi lista</option>

                </select>
            </form>


        );

}
