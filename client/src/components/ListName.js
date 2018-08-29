import React, { Component } from 'react';


export default class ListName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listName: this.props.listName,
            editing: false
        };

        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    onEditButtonClick() {
        this.setState({ editing: true });
        console.log('editing title');
    }

    onInputChange(event) {
        this.setState({ listName: event.target.value });
        console.log(this.state.listName);
    }

    onSaveButtonClick() {
        this.setState({ editing: false });
        this.props.onListEdit({ listName: this.state.listName });
    }

    render() {

        if (!this.state.editing) {
            return (
                <h2>{this.state.listName}<button onClick={this.onEditButtonClick}>Muokkaa</button></h2>
            );
        }

        return (
            <h2>
                <input
                    value={this.state.listName}
                    onChange={this.onInputChange} />
                <button
                    onClick={this.onSaveButtonClick}
                    >Tallenna</button>
            </h2>
        );





    }
}
