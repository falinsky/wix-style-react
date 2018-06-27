import eyes from 'eyes.it';
import {fieldTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

const storyUrl = getStoryUrl('12. Other', '12.6 FormField');
const driver = fieldTestkitFactory({dataHook: 'storybook-formfield'});

describe('FormField', () => {
  beforeAll(() =>
    browser.get(storyUrl));

  eyes.it('should render with label', () => {
    autoExampleDriver.setProps({label: 'hello'});
    waitForVisibilityOf(driver.element(), 'Cannot find FormField component')
      .then(() => {
        expect(driver.getLabel().getText()).toMatch('hello');
      });
  });

  eyes.it('should render asterisk when required and no label', () => {
    autoExampleDriver.setProps({required: true});
    waitForVisibilityOf(driver.element(), 'Cannot find FormField component')
      .then(() => {
        expect(driver.getAsterisk().getText()).toEqual('*');
      });
  });

  eyes.it('should render info icon when specified and no label', () => {
    autoExampleDriver.setProps({info: 'hello'});
    waitForVisibilityOf(driver.element(), 'Cannot find FormField component')
      .then(() => {
        expect(driver.getInfoIcon()).not.toBe(undefined);
      });
  });
});
