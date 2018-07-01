import React from 'react';
import textLinkLayoutDriverFactory from './TextLinkLayout.driver';
import TextLinkLayout from './TextLinkLayout';
import {createDriverFactory} from '../../test-common';
import {textLinkLayoutTestkitFactory} from '../../../testkit';
import {textLinkLayoutTestkitFactory as enzymeTextLinkLayoutTestkitFactory} from '../../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../../testkit/test-common';
import {mount} from 'enzyme';

describe('TextLinkLayout', () => {

  const createDriver = createDriverFactory(textLinkLayoutDriverFactory);

  it('should have a textLinkLayout', () => {
    const driver = createDriver(<TextLinkLayout/>);

    expect(driver.exists()).toBeTruthy();
  });

  it('should render children', () => {
    const children = '<div>123</div>';
    const driver = createDriver(<TextLinkLayout link="">{children}</TextLinkLayout>);

    expect(driver.getContent()).toBe(children);
  });

  it('should be with medium size by defualt', () => {
    const driver = createDriver(<TextLinkLayout/>);
    expect(driver.getSize()).toBe('medium');
  });

  it('should be with small size', () => {
    const driver = createDriver(<TextLinkLayout size="small"/>);
    expect(driver.getSize()).toBe('small');
  });

  it('should be with dark background', () => {
    const driver = createDriver(<TextLinkLayout theme="darkBackground" size="small"/>);
    expect(driver.isDarkBackground()).toBeTruthy();
  });

  it('should be with greyscale theme', () => {
    const driver = createDriver(<TextLinkLayout theme="greyScale" size="small"/>);
    expect(driver.isGreyScale()).toBeTruthy();
  });

  it('should be with light background', () => {
    const driver = createDriver(<TextLinkLayout size="small"/>);
    expect(driver.isLightBackground()).toBeTruthy();
  });

  it('should be with underline', () => {
    const driver = createDriver(<TextLinkLayout underlineStyle="always"/>);
    expect(driver.isUnderline()).toBeTruthy();
  });

  it('should not be with underline', () => {
    const driver = createDriver(<TextLinkLayout underlineStyle="never"/>);
    driver.hover();
    expect(driver.isUnderline()).toBeFalsy();
  });

  it('should not be with underline by defualt', () => {
    const driver = createDriver(<TextLinkLayout/>);
    expect(driver.isUnderline()).toBeFalsy();
  });

  it('should have underline on hover', () => {
    const driver = createDriver(<TextLinkLayout/>);
    driver.hover();
    expect(driver.isUnderline()).toBeTruthy();
  });

  it('should be with display block by defualt', () => {
    const driver = createDriver(<TextLinkLayout/>);
    expect(driver.getDisplay()).toBe('block');
  });

  it('should be with a custom display', () => {
    const driver = createDriver(<TextLinkLayout display="inline-block"/>);
    expect(driver.getDisplay()).toBe('inline-block');
  });

  describe('custom color', () => {
    const colorToPass = '#FF0000';
    const colorToCheck = 'rgb(255, 0, 0)';

    it('should be with default theme', () => {
      const driver = createDriver(<TextLinkLayout color={colorToPass}/>);
      expect(driver.getColor()).toBe(colorToCheck);
    });

    it('should be with custom theme', () => {
      const driver = createDriver(<TextLinkLayout color={colorToPass} theme="greyScale"/>);
      expect(driver.getColor()).toBe(colorToCheck);
    });
  });
});

describe('testkit', () => {
  it('should exist', () => {
    expect(isTestkitExists(<TextLinkLayout/>, textLinkLayoutTestkitFactory)).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    expect(isEnzymeTestkitExists(<TextLinkLayout/>, enzymeTextLinkLayoutTestkitFactory, mount)).toBe(true);
  });
});
