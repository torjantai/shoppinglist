import React, { Component } from 'react';


export default class AddRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: '',
            category: '',
            isNeeded: true
        };
        this.onArticleInputChange = this.onArticleInputChange.bind(this);
        this.onCategoryInputChange = this.onCategoryInputChange.bind(this);
    }

    onArticleInputChange(event) {
        this.setState({article: event.target.value});
    }

    onCategoryInputChange(event) {
        this.setState({category: event.target.value});
    }

    render() {
        return (
            <tr>
                    <td>
                        <input
                            placeholder="Lisää tuote"
                            value={this.state.article}
                            onChange={this.onArticleInputChange}
                            name="articleInput"
                            type="text" />
                    </td>
                    <td>
                        <input
                            placeholder="kategoria"
                            value={this.state.category}
                            onChange={this.onCategoryInputChange}
                            name="categoryInput"
                            type="text" />
                    </td>

                    <td><button
                            onClick={() => {
                                this.props.onItemAdd(this.state);
                                this.setState({ article: '', category: '' });
                            }}>Tallenna</button></td>
                </tr>
        );

    }
}
