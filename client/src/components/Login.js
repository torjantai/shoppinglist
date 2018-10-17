import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameField: '',
            passwordField: '',
        };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleUserNameChange(event) {
        this.setState({ userNameField: event.target.value }, () => console.log(this.state));
    }

    handlePasswordChange(event) {
        this.setState({ passwordField: event.target.value }, () => console.log(this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submit:', this.state)

    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">

                    <div className="col">
                        <input
                            onChange={this.handleUserNameChange}
                            type="text"
                            className="form-control"
                            placeholder="Tunnus"
                         />
                    </div>
                    <div className="col">
                        <input
                            onChange={this.handlePasswordChange}
                            type="text"
                            className="form-control"
                            placeholder="Salasana"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Kirjaudu</button>
                    </div>
                </div>
            </form>
        );
    }
}
