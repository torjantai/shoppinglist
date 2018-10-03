import React, { Component } from 'react';

export default class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: this.props.item.article,
            category: this.props.item.category,
        };

        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onArticleInputChange = this.onArticleInputChange.bind(this);
        this.onCategoryInputChange = this.onCategoryInputChange.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    onEditButtonClick() {
        if (this.props.selectedRow !== this.props.item._id) {
            this.props.onRowSelectChange();
        }
        this.props.onRowSelect(this.props.item._id)
        console.log(this.props);
    }

    onSaveButtonClick() {
        this.props.onRowSelect(null);
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

        if (this.props.selectedRow !== this.props.item._id) {
            return (
                <tr>
                    <td onClick={this.onEditButtonClick}>{this.state.article}</td>
                    <td onClick={this.onEditButtonClick}>{this.state.category}</td>
                    <td>
                        <button onClick={() => this.props.onItemEdit(
                        this.props.item._id, {isNeeded: !this.props.item.isNeeded })}>{moveButtonText}</button>


                        <button  onClick={() => this.props.onItemDelete(this.props.item._id)}>Poista</button>

                    {/* <button onClick={this.onEditButtonClick}>Muokkaa</button> */}
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
