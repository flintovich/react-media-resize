import React from 'react';

export default class MediumScreen extends React.Component {
	render () {
		const styles = {
			background: '#fcf7b5',
			padding: '10px',
			color: '#4c4c4c'
		};

		return (
			<div style={styles}>This is a block for Medium screen "640..1024"</div>
		)
	};
}
