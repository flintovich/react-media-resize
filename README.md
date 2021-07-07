# react-media-resize
Adaptive React components with a callback on entering or leaving in particular browser width on resize.

## Install

```console
$ npm install --save react-media-resize
```

## API

### `<MediaRange />`
The component that present possibility to work with responsive design in ReactJS.
It let us to use different components and change component state witch depends from browser screen width (on window resize).
You can see [simple demo](https://flintovich.github.io/react-media-resize).

#### Props

- `range` (*String or array*): Range with width or array of ranges. 
- `onEnter` (*Function*): Callback for entering in particular browser width
- `onLeave` (*Function*): Callback for leaving from particular browser width

Important that callback functions will be called only one time after applying particular range.
For example this can be useful if you want to call some actions on window resize. Like hide or show some section if browser screen less then 980px.

## Component Usage
```javascript
import React from 'react';
import MediaRange from 'react-media-resize';

const Component = () => {
  const handleEnterWidth = () => {
    console.log('You entered in range 768..1024');
  };
    
  const handleLeaveWidth = () => {
    console.log('You left range 768..1024');
  };
    
  return (
    <MediaRange
      range="768..1024"
      onEnter={handleEnterWidth}
      onLeave={handleLeaveWidth}
     >
      <AnotherComponent />
    </MediaRange>
  )
}
```

You can also to use several ranges for different window sizes with own callbacks:
```javascript
import React from 'react';
import MediaRange from 'react-media-resize';

const Component = () => {
  const rangesList = [
    {
      range: '..480',
      onEnter: () => {
        console.log('Entered in mobile width');
      },
    },
    {
      range: '481..1024',
      onEnter: () => {
        console.log('Entered in tablet width');
      },
      onLeave: () => {
        console.log('Left tablet width');
      },
    },
    {
      range: '1025..',
      onEnter: () => {
        console.log('Entered in desctop screen width');
      },
    },
  ];

  return (
    <MediaRange range={rangesList}>
      <AnotherComponent />
    </MediaRange>
  )
}
```

Also we can include to render or exclude component on window resize:
```xml
<>
  <MediaRange>
    <AnotherComponent range="..479" />
    <AnotherComponent range="480..1200" />
    <AlwaysVisibleComponent />
    <section>
      <MediaRange>
        <AnotherComponent range="1201.." />
      </MediaRange>
    </section>
  </MediaRange>
</>
```