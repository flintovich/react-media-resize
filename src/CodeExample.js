import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/styles';

export default class CodeExample extends React.Component {
  render() {
    const codeString = `
    
import React from 'react';
import MediaRange from 'react-media-resize';

export default class App extends React.Component {
  render() {
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
      <MediaRange range={rangesList} >
        <LittleScreen range="..480" />
        <MediumScreen range="640..1024" />
        <LargeScreen range="1200.." />
        <div>Some other block</div>
      </MediaRange>
    );
  }
}
    `;
    return <SyntaxHighlighter language='javascript' style={docco}>{codeString}</SyntaxHighlighter>;
  };
}
