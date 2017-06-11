import React from 'react';

import { Links } from '../api/links';

import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';
import AddLink from './AddLink';
import LinksList from './LinksList';

// export default class Link extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<PrivateHeader title="Your Links" />
// 				<AddLink />
// 				<LinksList />
// 			</div>
// 		);
// 	}
// }

export default () => {
	return (
		<div>
			<PrivateHeader title="Your Links" />
			<div className="page-content">
				<LinksListFilters />
				<AddLink />
				<LinksList />
			</div>
		</div>
	);
};