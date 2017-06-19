import React from 'react';

import Header from './Header';
import LittleScreen from './LittleScreen';
import MediumScreen from './MediumScreen';
import LargeScreen from './LargeScreen';

import MediaRange from 'react-media-resize';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentWindowSize: '',
			callBackCount: 0
		};
	}

	render() {
		const rangesList = [
			{
				range: '..480',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "..480"',
						callBackCount: ++this.state.callBackCount
					});
				}
			},
			{
				range: '640..1024',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "640..1024"',
						callBackCount: ++this.state.callBackCount
					});
				},
				onLeave: () => {
					this.setState({
						currentWindowSize: 'Leave from  "640..1024"',
						callBackCount: ++this.state.callBackCount
					});
				}
			},
			{
				range: '1200..',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "1200.."',
						callBackCount: ++this.state.callBackCount
					});
				}
			}
		];

		return (
			<div>
				<Header
					callBackCount={this.state.callBackCount}
					currentWindowSize={this.state.currentWindowSize}
				/>
				<div style={{border: '2px solid #373277', padding: '20px'}}>
					<MediaRange range={rangesList} >
						<LittleScreen range="..480" />
						<MediumScreen range="640..1024" />
						<LargeScreen range="1200.." />
						<div>Some other block</div>
					</MediaRange>
				</div>
			</div>
		);
	}
}
