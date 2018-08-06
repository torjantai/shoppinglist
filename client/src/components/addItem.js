import React, { Component } from 'react';


export default class AddItem extends Component {
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
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.onItemAdd(this.state);
                this.setState({
                    article: '',
                    category: '',
                    isNeeded: true
                });

            }}>
                    <input value={this.state.article} onChange={this.onArticleInputChange} name="articleInput" type="text" placeholder="Tuote" />
                    <input value={this.state.category} onChange={this.onCategoryInputChange} name="categoryInput" type="text" placeholder="Kategoria" />
                    <input type="submit" value="Lisää" />
            </form>
        );
    }
}
