# Loader Testkits

> Loader

## Loader TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| exists   | -         | boolean        | fulfilled if element in the DOM          |
| getColor | -         | string         | returns the loader color ('blue' or 'white') |
| getText  | -         | string         | returns the element text                 |
| hasText  | -         | boolean        | true if the element has text             |
| isLarge  | -         | boolean        | true when using the large loader         |
| isMedium | -         | boolean        | true when using the medium loader        |
| isSmall  | -         | boolean        | true when using the small loader         |
| isTiny   | -         | boolean        | true when using the tiny loader          |
| setProps | object    | element        | returns a clone of this element with the new props from the json |

## Loader Protractor TestKit API

| method   | arguments | returned value | description                              |
| -------- | --------- | -------------- | ---------------------------------------- |
| element  | -         | element        | returns the driver element               |
| exists   | -         | boolean        | fulfilled if element in the DOM          |
| getColor | -         | string         | returns the loader color ('blue' or 'white') |
| getText  | -         | string         | returns the element text (will be in upper case) |
| hasText  | -         | boolean        | true if the element has text             |
| isLarge  | -         | boolean        | true when using the large loader         |
| isMedium | -         | boolean        | true when using the medium loader        |
| isSmall  | -         | boolean        | true when using the small loader         |
| isTiny   | -         | boolean        | true when using the tiny loader          |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {mount} from 'enzyme';
  import {loaderTestkitFactory} from 'wix-style-react/dist/testkit';
  import {loaderTestkitFactory as enzymeLoaderTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  import Loader from 'wix-style-react/Loader';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Loader dataHook={dataHook}/></div>);
  const testkit = enzymeLoaderTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Loader dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = loaderTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <Loader dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {loaderTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = loaderTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Loader')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });

```
