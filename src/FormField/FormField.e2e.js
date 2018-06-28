import eyes from 'eyes.it';
import {formFieldTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

const storyUrl = getStoryUrl('12. Other', '12.6 FormField');
const driver = formFieldTestkitFactory({dataHook: 'storybook-formfield'});

describe('FormField', () => {
  beforeAll(() =>
    browser.get(storyUrl));

  eyes.it('should render with label', async () => {
    await autoExampleDriver.setProps({label: 'hello'});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.getLabel().getText()).toMatch('hello');
  });

  eyes.it('should render asterisk when required and no label', async () => {
    await autoExampleDriver.setProps({required: true});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.getAsterisk().getText()).toEqual('*');
  });

  eyes.it('should render info icon when specified and no label', async () => {
    await autoExampleDriver.setProps({info: 'hello'});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.getInfoIcon()).not.toBe(undefined);
  });
});
