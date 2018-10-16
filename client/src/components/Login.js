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


    }

    handleUserNameChange(event) {
        this.setState({ userNameField: event.target.value }, () => console.log(this.state));
    }

    handlePasswordChange(event) {
        this.setState({ passwordField: event.target.value }, () => console.log(this.state));
    }


    render() {
        return (
            <form>
                <div class="row">

                    <div class="col">
                        <input
                            onChange={this.handleUserNameChange}
                            type="text"
                            class="form-control"
                            placeholder="Tunnus"
                         />
                    </div>
                    <div class="col">
                        <input
                            onChange={this.handlePasswordChange}
                            type="text"
                            class="form-control"
                            placeholder="Salasana"
                        />
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-primary">Luo tunnus</button>
                    </div>
                </div>
            </form>
        );
    }
}
