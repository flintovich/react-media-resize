import React from 'react';

export default class LargeScreen extends React.Component {
	render () {
		const styles = {
			background: '#fc6d8e',
			padding: '10px',
			color: '#4c4c4c'
		};

		return (
			<div style={styles}>This is a block for Large screen</div>
		)
	};
}
