import React, { Component } from 'react';


export default class SelectList extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.lists[0]._id };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        console.log(this.state.value);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
    }

    render () {
        return (
            <form>
                <label>
                    Valitse lista:
                    <select value={this.state.value} onChange={this.onChange}>

                        {this.props.lists.map(list =>
                            <option value={list._id} key={list._id}>{list.listName} {list._id}</option>
                        )}

                    </select>

                </label>
            </form>


        );
    }

}
