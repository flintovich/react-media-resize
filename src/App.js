import React from 'react';

import Header from './Header';
import LittleScreen from './LittleScreen';
import MediumScreen from './MediumScreen';
import LargeScreen from './LargeScreen';
import CodeExample from './CodeExample';

import MediaRange from 'react-media-resize';

export default class App extends React.Component {

	constructor(props) {
		super(props);
    this.changeCodeVisibleState = this.changeCodeVisibleState.bind(this);

		this.state = {
			currentWindowSize: '',
			callBackCount: 0,
			codeVisible: false
		};
	}
  
  changeCodeVisibleState() {
		this.setState({
      codeVisible: !this.state.codeVisible
		});
	}

	render() {
		const { callBackCount, currentWindowSize, codeVisible } = this.state;
		const styles = {
			link: {
        color: '#373277',
				textDecoration: 'underline',
				margin: '35px 10px 5px',
				display: 'inline-block',
				cursor: 'pointer'
			}
		};
		const rangesList = [
			{
				range: '..480',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "..480"',
						callBackCount: ++this.state.callBackCount
					});
					console.log('--->', 'Enter in "..480"');
				}
			},
			{
				range: '640..1024',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "640..1024"',
						callBackCount: ++this.state.callBackCount
					});
					console.log('--->', 'Enter in "640..1024"');
				},
				onLeave: () => {
					this.setState({
						currentWindowSize: 'Leave from "640..1024"',
						callBackCount: ++this.state.callBackCount
					});
					console.log('--->', 'Leave from "640..1024"');
				}
			},
			{
				range: '1200..',
				onEnter: () => {
					this.setState({
						currentWindowSize: 'Enter in "1200.."',
						callBackCount: ++this.state.callBackCount
					});
					console.log('--->', 'Enter in "1200.."');
				}
			}
		];

		return (
			<div>
				<Header
					callBackCount={callBackCount}
					currentWindowSize={currentWindowSize}
				/>
				<div style={{border: '2px solid #373277', padding: '20px'}}>
					<MediaRange range={rangesList} >
						<LittleScreen range="..480" />
						<MediumScreen range="640..1024" />
						<LargeScreen range="1200.." />
						<div>Some other block</div>
					</MediaRange>
				</div>
				<span onClick={this.changeCodeVisibleState} style={styles.link}>
					{`${codeVisible ? 'Hide' : 'Show'}`} code of this example
				</span>
				{codeVisible && <CodeExample />}
			</div>
		);
	}
}
