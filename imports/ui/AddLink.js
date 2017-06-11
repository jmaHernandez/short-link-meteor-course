import { Meteor } from 'meteor/meteor';

import React from 'react';
import Modal from 'react-modal';

class AddLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			url: '',
			isOpen: false,
			error: ''
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const url = this.state.url;

		Meteor.call('links.insert', url, (err, res) => {
			if (!err) {
				this.handleModalClose();
			} else {
				this.setState({ error: err.reason });
			}
		});
	}

	onChange(e) {
		this.setState({ url: e.target.value.trim() });
	}

	handleModalClose(e) {
		e.preventDefault();

		this.setState({ isOpen: false, url: '', error: '' });
	}

	render() {
		return (
			<div>
				<button onClick={ () => this.setState({ isOpen: true }) } className="button">+ Add Link</button>
				<Modal isOpen={ this.state.isOpen } onAfterOpen={ () => this.refs.url.focus() } onRequestClose={ this.handleModalClose.bind(this) } contentLabel="Add link" overlayClassName="boxed-view boxed-view--modal" className="boxed-view__box">
					<h1>Add Link</h1>

					{ this.state.error ? <p>{ this.state.error }</p> : undefined }
					
					<form onSubmit={ this.onSubmit.bind(this) } className="boxed-view__form">
						<input type="text" ref="url" placeholder="URL" value={ this.state.url } onChange={ this.onChange.bind(this) } />
						<button className="button">Add Link</button>
						<button onClick={ this.handleModalClose.bind(this) } className="button button--secondary">Cancel</button>
					</form>
				</Modal>
			</div>
		);
	}
}

export default AddLink;