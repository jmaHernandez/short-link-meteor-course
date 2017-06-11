import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import React from 'react';

export default class LinksListFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showVisible: false
		};
	}

	componentDidMount() {
		this.tracker = Tracker.autorun(() => {
			this.setState({ showVisible: Session.get('showVisible') });
		});
	}

	componentWillUnmount() {
		this.tracker.stop();
	}

	render() {
		return (
			<div className="filters">
				<input type="checkbox" onChange={ (e) => { Session.set('showVisible', !e.target.checked); } } checked={ !this.state.showVisible } className="filters__checkbox" />
				<label className="filters__label">show hidden links</label>
			</div>
		);
	}
}