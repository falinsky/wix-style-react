# Contributing

We're happy for your input but we also want good quality. Hence contributors are required to:

* submit concise and clear issues with reproducible examples
* submit focused pull requests that tackle one thing only

## Contacts

* product/UI/UX [Ben Benhorin](https://wix.slack.com/messages/@benb)
* code/issues/PRs [Lior Belinksy (@lbelinsk)](https://github.com/lbelinsk) [Arijus Šukys (@argshook)](https://github.com/argshook)

Do not hesitate to reach out, we are here to help.

## Setup

> __Note:__ This library depends on watchman, install it by following [this guide](https://facebook.github.io/watchman/docs/install.html).

```sh
nvm use
npm install
npm start
open localhost:6006
```

`npm start` spins up a server at [localhost:6006](http://localhost:6006) with [storybook](https://storybook.js.org/). this is our reference/sandbox.

## Components guidelines

* One component per file
* All assets in `src/assets` folder
* e2e & unit test as well as enzyme & protractor testkits. See [Testing](https://wix-wix-style-react.surge.sh/?selectedKind=Introduction&selectedStory=Testing&full=0&down=0&left=1&panelRight=0) for details.
* Prefer [controlled components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
* support `rtl` boolean prop to support right-to-left languages

## Adding new component

* check github issues if no one else is working on same component
* use `WixComponent` as super class for your component, e.g.: `class MyComponent extends WixComponent`
* use spread `...` instead of `Object.assign`, e.g.:

    ```js
    // bad
    MyComponent.propTypes = Object.assign(
      {},
      SomeOtherComponent.propTypes,
      { customProps: PropTypes.string }
    );

    // good
    MyComponent.propTypes = {
      ...SomeOtherComponent.propTypes,
      customProps: PropTypes.string
    };
    ```

    It's important since in a good case we are able to automatically parse the source and create API docs for your component.

* design according to [Zeplin](https://app.zeplin.io/project/5864e02695b5754a69f56150) design created by UX guild.
* follow [Documenting Components](https://wix-wix-style-react.surge.sh/?selectedKind=Introduction&selectedStory=Documenting%20components&full=0&down=0&left=1&panelRight=0) to configure and generate docs automatically.
* add unit and e2e tests as well as testkits for enzyme and protractor. See [Testing](https://wix-wix-style-react.surge.sh/?selectedKind=Introduction&selectedStory=Testing&full=0&down=0&left=1&panelRight=0) for details.
* export your `testkitFactory` from the following files:
    * `wix-style-react/testkit/index.js`
    * `wix-style-react/testkit/enzyme.js`
    * `wix-style-react/testkit/protractor.js`

## Writing test drivers
* drivers should be a good way to inteact with the component when testing and do one of the following:
  * make a side effect (click)
  * retrieve some data (some value / is checked)
  * another component driver to interact with (an autocomplete the uses an input can return the input driver)
* drivers should test the behavior and not test React, so do query for props but values.
* use `data-hook`s to query for elements in the DOM.
* enzyme / vanilla drivers should be written without any enzyme related functionality, they should stay pure vanilla dom manipulation.
* Each test has sanity check for testkit and should use the `isTestkitExists` and `isEnzymeTestkitExists`.
* notes regarding existing drivers:
  * Do not use the `setProps` method. this function will not work for the consumer of this driver.
  * Support `exists()` method also when the result should be false. for example, syntax like `element.childNodes[0]` should be more safe: `if (element) { element.childNodes[0] }...`


  
