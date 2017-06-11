import { Meteor } from 'meteor/meteor';

import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';
import PropTypes from 'prop-types';

class LinksListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			justCopied: false
		};
	}

	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);

		this.clipboard
			.on('success', () => {
				this.setState({ justCopied: true });

				setTimeout(() => this.setState({ justCopied: false }), 1000);
			})
			.on('error', () => {
				alert('Unable to copy. Please manually copy the link.');
			})
		;
	}

	componentWillUnmount() {
		this.clipboard.destroy();
	}

	renderStats() {
		let visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let visitedMessage = null;
		
		if (typeof this.props.lastVisitedAt === 'number') {
			visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`;
		}

		return <p className="item__message">{ this.props.visitedCount } { visitMessage } - { visitedMessage }</p>;
	}

	render() {
		return (
			<div className="item">
				<h2 className="item__url">{ this.props.url }</h2>
				<p className="item__message">{ this.props.shortUrl }</p>
				{ /* <p>{ this.props.visible.toString() }</p>  */ }
				{ this.renderStats() }
				<a href={ this.props.shortUrl } target="_blank" className="button button--link button--pill">Visit</a>
				<button ref="copy" data-clipboard-text={ this.props.shortUrl } className="button button--pill">
					{ this.state.justCopied ? 'Copied' : 'Copy' }
				</button>
				<button ref="hide" onClick={ () => { Meteor.call('links.setVisibility', this.props._id, !this.props.visible); } } className="button button--pill">
					{ this.props.visible ? 'Hide' : 'Unhide' }
				</button>
			</div>
		);
	}
}

LinksListItem.propTypes = {
	_id: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	shortUrl: PropTypes.string.isRequired,
	visitedCount: PropTypes.number.isRequired,
	lastVisitedAt: PropTypes.number
};

export default LinksListItem;