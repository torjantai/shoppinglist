import React, { Component } from 'react';


export default class SelectList extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onSelectChange(event.target.value);
    }

    render () {
        console.log(this.props)
        return (
            <form>
                <label>
                    Valitse lista:
                    <select onChange={this.onChange}>

                        {this.props.lists.map(list => {
                            return (<option value={list._id} key={list._id}>{list.listName} {list._id}</option>);
                        }

                        )}

                    </select>

                </label>
            </form>


        );
    }

}
