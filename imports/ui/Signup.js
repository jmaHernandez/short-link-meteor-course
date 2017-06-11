import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ''
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();

		if (email.length <= 8) {
			return this.setState({ error: 'Email must be more than 8 caracters long'});
		}

		if (password.length <= 8) {
			return this.setState({ error: 'Password must be more than 8 characters long'});
		}

		Accounts.createUser({ email, password }, (error) => {
			if (error) {
				this.setState({ error: error.reason });
			} else {
				this.setState({ error: '' });
			}
		});
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Join Short Link</h1>
					
					{ this.state.error ? <p>{ this.state.error }</p> : undefined }

					<form onSubmit={ this.onSubmit.bind(this) } noValidate  className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="Email" />
						<input type="password" ref="password" name="password" placeholder="Password" />
						<button className="button">Create account</button>
					</form>
					
					<Link to="/">Already have an account ?</Link>
				</div>
			</div>
		);
	}
}

export default Signup;