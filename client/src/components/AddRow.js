import React, { Component } from 'react';


export default class AddRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: '',
            category: '',
            isNeeded: true
        };
    }

    onArticleInputChange = (event) => {
        this.setState({article: event.target.value});
    }

    onCategoryInputChange = (event) => {
        this.setState({category: event.target.value});
    }

    onSave = () => {
        this.props.onItemAdd(this.state);
        this.setState({ article: '', category: '' });
    }

    onInputEnter = (e) => {
        if (e.keyCode === 13) {
           this.onSave();
        }
    }

    render() {
        const isDisabled = ( this.state.article === '' || this.state.category === '' ) ? true : false;

        return (
            <tr>
                    <td>
                        <input
                            onKeyDown={this.onInputEnter}
                            className="input-group"
                            placeholder="Lisää tuote"
                            value={this.state.article}
                            onChange={this.onArticleInputChange}
                            name="articleInput"
                            type="text" />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.onInputEnter}
                            className="input-group"
                            placeholder="kategoria"
                            value={this.state.category}
                            onChange={this.onCategoryInputChange}
                            name="categoryInput"
                            type="text" />
                    </td>

                    <td><button
                            disabled={isDisabled}
                            onClick={this.onSave}
                        >Lisää</button></td>
                </tr>
        );

    }
}
