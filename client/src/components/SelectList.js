import React, { Component } from 'react';


export default class SelectList extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if(event.target.value === 'new list') {
            this.props.createList({
                listName: 'Uusi lista',
                owner: 'madman',
                items: [{
                    article: 'Olutta',
                    category: 'Juomat',
                    isNeeded: true
                }]
            });
        } else {
            this.props.onSelectChange(event.target.value);
        }
    }

    render () {
        console.log(this.props)
        return (
            <form>
                <select
                    className="form-control"
                    value={this.props.selectedList}
                    onChange={this.onChange}>

                    {this.props.lists.map(list => {
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

}
