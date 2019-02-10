import React, { Component } from 'react';


export default class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: this.props.item.article,
            category: this.props.item.category,
        };
    }

    onEditButtonClick = () => {
        this.props.onRowSelect(this.props.item._id)
    }

    onSaveButtonClick = () => {
        this.props.onRowSelect(null);
        //will be saved only if fields have been changed
        if ( this.state.article !== this.props.item.article ||
            this.state.category !== this.props.item.category ) {
            this.props.onItemEdit(this.state);
        }
    }

    onArticleInputChange = (event) => {
        this.setState({ article: event.target.value });
    }

    onCategoryInputChange = (event) => {
        this.setState({ category: event.target.value });
    }

    render() {

        const moveButtonText = this.props.item.isNeeded ? 'Ostettu' : 'Ostettaviin';

        if (this.props.selectedRow !== this.props.item._id) {
            return (
                <tr>
                    <td onClick={this.onEditButtonClick}>{this.state.article}</td>
                    <td onClick={this.onEditButtonClick}>{this.state.category}</td>
                    <td>
                        <button onClick={() => this.props.onItemEdit(this.props.item, { ...this.state, isNeeded: !this.props.item.isNeeded })}>{moveButtonText}</button>


                        <button
                            onClick={() => {
                                this.props.onItemDelete(this.props.item);
                            }}
                        >
                        Poista
                        </button>

                </td>
                </tr>
            );
        }

        return (
            <tr>
                <td>
                <input value={this.state.article} onChange={this.onArticleInputChange} name="articleInput" type="text" /></td>
                <td><input value={this.state.category} onChange={this.onCategoryInputChange} name="categoryInput" type="text" /></td>
                <td>
                    {/* <button disabled onClick={() => this.props.onItemEdit(
                    this.props.item._id, {isNeeded: false })}>Ostettu</button>


                    <button disabled onClick={() => this.props.onItemDelete(this.props.item._id)}>Poista</button> */}

                <button onClick={this.onSaveButtonClick}>Tallenna</button></td>
            </tr>
        );

    }
}
