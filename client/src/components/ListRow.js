import React, { Component } from 'react';

export default class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: this.props.item.article,
            category: this.props.item.category,
            editing: false
        };

        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onArticleInputChange = this.onArticleInputChange.bind(this);
        this.onCategoryInputChange = this.onCategoryInputChange.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    onEditButtonClick() {
        this.setState({ editing: true });
    }

    onSaveButtonClick() {
        this.setState({ editing: false });
        this.props.onItemEdit(this.props.item._id,{
            article: this.state.article,
            category: this.state.category
        });

    }

    onArticleInputChange(event) {
        this.setState({article: event.target.value});
    }

    onCategoryInputChange(event) {
        this.setState({category: event.target.value});
    }
    render() {

        const moveButtonText = this.props.item.isNeeded ? 'Ostettu' : 'Ostettaviin';

        if (!this.state.editing) {
            return (
                <tr>
                    <td>{this.props.item.article}</td>
                    <td>{this.props.item.category}</td>
                    <td>
                        <button onClick={() => this.props.onItemEdit(
                        this.props.item._id, {isNeeded: !this.props.item.isNeeded })}>{moveButtonText}</button>
                    </td>
                    <td>
                        <button  onClick={() => this.props.onItemDelete(this.props.item._id)}>Poista</button>
                    </td>
                    <td><button onClick={this.onEditButtonClick}>Muokkaa</button></td>
                </tr>
            );
        }

        return (
            <tr>
                <td>
                <input value={this.state.article} onChange={this.onArticleInputChange} name="articleInput" type="text" /></td>
                <td><input value={this.state.category} onChange={this.onCategoryInputChange} name="categoryInput" type="text" /></td>
                <td>
                    <button disabled onClick={() => this.props.onItemEdit(
                    this.props.item._id, {isNeeded: false })}>Ostettu</button>
                </td>
                <td>
                    <button disabled onClick={() => this.props.onItemDelete(this.props.item._id)}>Poista</button>
                </td>
                <td><button onClick={this.onSaveButtonClick}>Tallenna</button></td>
            </tr>
        );

    }
}
