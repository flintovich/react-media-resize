import React from 'react';

export default class Header extends React.Component {
	render () {
		const { callBackCount, currentWindowSize } = this.props;
		const styles = {
			header: {
				background: '#373277',
				padding: '20px 20px 40px',
				color: '#fff',
				fontFamily: 'Verdana, Arial',
				fontWeight: 'normal',
				textAlign: 'center',
				position: 'relative'
			},
			count: {
				position: 'absolute',
				left: 7,
				bottom: 7
			},
			range: {
				position: 'absolute',
				right: 7,
				bottom: 7
			}
		};

		return (
			<header style={styles.header}>
				<h1>react-media-resize</h1>
				<div>Please, resize your window</div>
				<div style={styles.count}><small>CallBacks Count: <strong>{callBackCount}</strong></small></div>
				<div style={styles.range}><small>{currentWindowSize}</small></div>
			</header>
		)
	};
}
