import React from 'react';

export default class LittleScreen extends React.Component {
	render () {
		const styles = {
			background: '#c2fcf4',
			padding: '10px',
			color: '#666'
		};

		return (
			<div style={styles}>This is a block for Little screen "..480"</div>
		)
	};
}
