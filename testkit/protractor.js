import 'regenerator-runtime/runtime';
import {protractorTestkitFactoryCreator} from '../src/test-common';
/*eslint no-duplicate-imports: 0*/
export {getStoryUrl, waitForVisibilityOf, scrollToElement} from '../src/test-common';

import inputDriverFactory from '../src/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);

import addItemDriverFactory from '../src/AddItem/AddItem.protractor.driver';
export const addItemTestkitFactory = protractorTestkitFactoryCreator(addItemDriverFactory);

import richTextAreaDriverFactory from '../src/RichTextArea/RichTextArea.protractor.driver';
export const richTextAreaTestkitFactory = protractorTestkitFactoryCreator(richTextAreaDriverFactory);

import inputAreaDriverFactory from '../src/InputArea/InputArea.protractor.driver';
export const inputAreaTestkitFactory = protractorTestkitFactoryCreator(inputAreaDriverFactory);

import buttonDriverFactory from '../src/Backoffice/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);

import tpaButtonDriverFactory from '../src/TPA/Button/Button.protractor.driver';
export const tpaButtonTestkitFactory = protractorTestkitFactoryCreator(tpaButtonDriverFactory);

import tpaInputDriverFactory from '../src/TPA/Input/Input.protractor.driver';
export const tpaInputTestkitFactory = protractorTestkitFactoryCreator(tpaInputDriverFactory);

import pageDriverFactory from '../src/Page/Page.protractor.driver';
export const pageTestkitFactory = protractorTestkitFactoryCreator(pageDriverFactory);

import dataTableDriverFactory from '../src/DataTable/DataTable.protractor.driver';
export const dataTableTestkitFactory = protractorTestkitFactoryCreator(dataTableDriverFactory);

import tableDriverFactory from '../src/Table/Table.protractor.driver';
export const tableTestkitFactory = protractorTestkitFactoryCreator(tableDriverFactory);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.protractor.driver';
export const breadcrumbsTestkitFactory = protractorTestkitFactoryCreator(breadcrumbsDriverFactory);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.protractor.driver';
export const autoCompleteTestkitFactory = protractorTestkitFactoryCreator(autoCompleteDriverFactory);

import checkboxDriverFactory from '../src/Checkbox/Checkbox.protractor.driver';
export const checkboxTestkitFactory = protractorTestkitFactoryCreator(checkboxDriverFactory);

import dropdownDriverFactory from '../src/Dropdown/Dropdown.protractor.driver';
export const dropdownTestkitFactory = protractorTestkitFactoryCreator(dropdownDriverFactory);

import buttonWithOptionsDriverFactory from '../src/ButtonWithOptions/ButtonWithOptions.protractor.driver';
export const buttonWithOptionsTestkitFactory = protractorTestkitFactoryCreator(buttonWithOptionsDriverFactory);

import languagePickerDriverFactory from '../src/LanguagePicker/LanguagePicker.protractor.driver';
export const languagePickerTestkitFactory = protractorTestkitFactoryCreator(languagePickerDriverFactory);

import filePickerDriverFactory from '../src/FilePicker/FilePicker.protractor.driver';
export const filePickerTestkitFactory = protractorTestkitFactoryCreator(filePickerDriverFactory);

import radioGroupDriverFactory from '../src/RadioGroup/RadioGroup.protractor.driver';
export const radioGroupTestkitFactory = protractorTestkitFactoryCreator(radioGroupDriverFactory);

import textAreaDriverFactory from '../src/TextArea/TextArea.protractor.driver';
export const textAreaTestkitFactory = protractorTestkitFactoryCreator(textAreaDriverFactory);

import textFieldDriverFactory from '../src/TextField/TextField.protractor.driver';
export const textFieldTestkitFactory = protractorTestkitFactoryCreator(textFieldDriverFactory);

import dropdownCompositeDriverFactory from '../src/DropdownComposite/DropdownComposite.protractor.driver';
export const dropdownCompositeTestkitFactory = protractorTestkitFactoryCreator(dropdownCompositeDriverFactory);

import multiSelectCompositeDriverFactory from '../src/MultiSelectComposite/MultiSelectComposite.protractor.driver';
export const multiSelectCompositeTestkitFactory = protractorTestkitFactoryCreator(multiSelectCompositeDriverFactory);

import autoCompleteCompositeDriverFactory from '../src/AutoCompleteComposite/AutoCompleteComposite.protractor.driver';
export const autoCompleteCompositeTestkitFactory = protractorTestkitFactoryCreator(autoCompleteCompositeDriverFactory);

import rangeDriverFactory from '../src/Range/Range.protractor.driver';
export const rangeTestkitFactory = protractorTestkitFactoryCreator(rangeDriverFactory);

import fieldWithSelectionCompositeDriverFactory from '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.protractor.driver';
export const fieldWithSelectionCompositeTestkitFactory = protractorTestkitFactoryCreator(fieldWithSelectionCompositeDriverFactory);

import googleAddressWithInputDriverFactory from '../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.protractor.driver';
export const googleAddressWithInputTestkitFactory = protractorTestkitFactoryCreator(googleAddressWithInputDriverFactory);

import imageViewerDriverFactory from '../src/ImageViewer/ImageViewer.protractor.driver';
export const imageViewerTestkitFactory = protractorTestkitFactoryCreator(imageViewerDriverFactory);

import tpaTextLinkDriverFactory from '../src/TPA/TextLink/TextLink.protractor.driver';
export const tpaTextLinkTestkitFactory = protractorTestkitFactoryCreator(tpaTextLinkDriverFactory);

import popoverMenuDriverFactory from '../src/PopoverMenu/PopoverMenu.protractor.driver';
export const popoverMenuTestkitFactory = protractorTestkitFactoryCreator(popoverMenuDriverFactory);

import multiSelectDriverFactory from '../src/MultiSelect/MultiSelect.protractor.driver';
export const multiSelectTestkitFactory = protractorTestkitFactoryCreator(multiSelectDriverFactory);

import multiSelectCheckboxDriverFactory from '../src/MultiSelectCheckbox/MultiSelectCheckbox.protractor.driver';
export const multiSelectCheckboxTestkitFactory = protractorTestkitFactoryCreator(multiSelectCheckboxDriverFactory);

import datePickerDriverFactory from '../src/DatePicker/DatePicker.protractor.driver';
export const datePickerTestkitFactory = protractorTestkitFactoryCreator(datePickerDriverFactory);

import editableSelectorDriverFactory from '../src/EditableSelector/EditableSelector.protractor.driver';
export const editableSelectorTestkitFactory = protractorTestkitFactoryCreator(editableSelectorDriverFactory);

import iconWithOptionsDriverFactory from '../src/IconWithOptions/IconWithOptions.protractor.driver';
export const iconWithOptionsTestkitFactory = protractorTestkitFactoryCreator(iconWithOptionsDriverFactory);

import searchDriverFactory from '../src/Search/Search.protractor.driver';
export const searchTestkitFactory = protractorTestkitFactoryCreator(searchDriverFactory);

import highlighterDriverFactory from '../src/Highlighter/Highlighter.protractor.driver';
export const highlighterTestkitFactory = protractorTestkitFactoryCreator(highlighterDriverFactory);

import statsWidgetDriverFactory from '../src/StatsWidget/StatsWidget.protractor.driver';
export const statsWidgetTestkitFactory = protractorTestkitFactoryCreator(statsWidgetDriverFactory);

import loaderDriverFactory from '../src/Loader/Loader.protractor.driver';
export const loaderTestkitFactory = protractorTestkitFactoryCreator(loaderDriverFactory);

import modalSelectorLayoutDriverFactory from '../src/ModalSelectorLayout/ModalSelectorLayout.protractor.driver';
export const modalSelectorLayoutTestkitFactory = protractorTestkitFactoryCreator(modalSelectorLayoutDriverFactory);

import sliderDriverFactory from '../src/Slider/Slider.protractor.driver';
export const sliderTestkitFactory = protractorTestkitFactoryCreator(sliderDriverFactory);

import tabsDriverFactory from '../src/Tabs/Tabs.protractor.driver';
export const tabsTestkitFactory = protractorTestkitFactoryCreator(tabsDriverFactory);

import drillViewDriverFactory from '../src/SideMenu/DrillView/DrillView.protractor.driver';
export const drillViewTestkitFactory = protractorTestkitFactoryCreator(drillViewDriverFactory);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.protractor.driver';
export const tooltipTestkitFactory = protractorTestkitFactoryCreator(tooltipDriverFactory);

import formFieldDriverFactory from '../src/FormField/FormField.protractor.driver';
export const formFieldTestkitFactory = protractorTestkitFactoryCreator(formFieldDriverFactory);

// wix-ui-backoffice proxy

export {
  badgeTestkitFactory,
  stylableCounterBadgeTestkitFactory as counterBadgeTestkitFactory,
  headingTestkitFactory,
  toggleSwitchTestkitFactory,
  textTestkitFactory,
  labelTestkitFactory,
  floatingHelperTestkitFactory,
  linearProgressBarTestkitFactory
} from 'wix-ui-backoffice/dist/src/testkit/protractor';
