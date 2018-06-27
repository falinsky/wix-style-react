/**
  * Storybook list of stories
  *
  * order is reflected in storybook sidebar
  */

import '../stories/Introduction';
import '../stories/Composite'; // TODO: Move to introduction

// 1. Foundations
import '../stories/Text'; // 1.2 Text
// import '../stories/Label/index.story.js'; // 1.2 + Text
import '../stories/Label'; // 1.2 + Label
import '../stories/Heading'; // 1.3 Heading
import '../stories/Icons'; // 1.4 Icons
import '../stories/Loader.story.js'; // 1.5 Loader
import '../stories/LinearProgressBar.story.js'; // 1.6 LinearProgressBar

// 2. Layout
import '../stories/Page/index.story.js'; // 2.5 Page
import '../stories/PageHeader/index.story.js'; // 2.5 + PageHeader
import '../stories/Page/FullPageExample.js'; // 2.5 + Page Example
import '../stories/StatsWidget'; // 2.6 StatsWidget
import '../stories/GridWithCardLayout'; // Grid & Card


// 3. Inputs
import '../stories/TextField'; // 3.1 Text Field
import '../stories/Input'; // 3.1 + Input
import '../stories/TextArea'; // 3.2a Text Area
import '../stories/InputArea/index.story.js'; // 3.2a + InputArea
import '../stories/RichTextAreaComposite'; // 3.2b RichTextAreaComposite
import '../stories/RichTextArea/RichTextArea.story.js' // 3.2b + RichTextArea
import '../stories/FieldWithSelectionComposite'; // 3.3 Field With Selection
import '../stories/TimeInput.story.js'; // 3.4 TimeInput
import '../stories/DatePicker.story.js'; // 3.6 DatePicker
import '../stories/Range'; // 3.7 Range
import '../stories/MultiSelect'; // 3.8 Tags
import '../stories/MultiSelectComposite'; // 3.8 + MultiSelectComposite
import '../stories/Search.story.js'; // 3.9 Search
import '../stories/ImageViewer'; // 3.10 ImageViewer
import '../stories/FilePicker'; // 3.10 + FilePicker
import '../stories/GoogleAddressInput'; // 3.11 GoogleAddressInput
import '../stories/AddItem/addItem.story.js'; // 3.12 AddItem

// 4. Selection
import '../stories/Dropdown'; // 4.1 Dropdown
import '../stories/AutoComplete'; // 4.1 + AutoComplete
import '../stories/AutoCompleteComposite'; // 4.1 + AutoCompleteComposite
import '../stories/InputWithOptions'; // 4.1 + InputWithOptions
import '../stories/IconWithOptions'; // 4.1 + IconWithOptions
import '../stories/ButtonWithOptions'; // 4.1 + ButtonWithOptions
import '../stories/DropdownComposite'; // 4.1 + DropdownComposite
import '../stories/MultiSelectCheckbox/index.story.js'; // 4.1 + MultiSelectCheckbox
import '../stories/Checkbox.story.js'; // 4.2 Checkbox
import '../stories/RadioGroup.story.js'; // 4.3 RadioGroup
import '../stories/ToggleSwitch'; // 4.4 ToggleSwitch
import '../stories/Slider'; // 4.7 Slider
import '../stories/GoogleAddressInputWithLabel'; // 4.8 Google address input


// 5. Buttons
import '../stories/ButtonLayout.story.js'; // 5.0 ButtonLayout
import '../stories/Button/standard.story.js'; // 5.1 Standard
import '../stories/Button/white.story.js'; // 5.2 White
import '../stories/Button/icon.story.js'; // 5.3 Icon
import '../stories/Button/error.story.js'; // 5.4 Error
import '../stories/Button/premium.story.js'; // 5.5 Premium
import '../stories/Button/transparent.story.js'; // 5.6 Transparent
import '../stories/Button/close.story.js'; // 5.7 Close
import '../stories/TextLink/index.story.js'; // 5.8 Text Link


// 6. Navigation
import '../stories/SideMenu'; // 6.1 SideMenu
import '../stories/Breadcrumbs/index.story.js'; // 6.2 + Breadcrumbs
import '../stories/Tabs'; // 6.3 Tabs


// 7. Tooltips
// 7.1 Tooltip, 7.2 Popover, 7.3 Popover Menu
import '../stories/Tooltip/Composite/CompositeStory';


// 8. Notification Bars
// 8.1 Standard, 8.2 Error, 8.3 Success, 8.4 Warning, 8.5 Premium
import '../stories/Notification';
import '../stories/FloatingHelper/FloatingHelper.story.js'; // 8.6 FloatingHelper
import '../stories/FloatingHelperContent/FloatingHelperContent.story.js'; // 8.6 + FloatingHelper.Content
import '../stories/SectionHelper.story.js'; // 8.7 SectionHelper


// 9. Modals
import '../stories/MessageBox';
import '../stories/Modal';
import '../stories/EndorseContentLayout';

// 10. Tables
import '../stories/DataTable'; // 10.1 DataTable

// 11. Pickers and Selectors
import '../stories/DropdownLayout'; // 11.1 DropdownLayout
import '../stories/EditableSelector'; // 11.2 EditableSelector
import '../stories/ModalSelectorLayout.story.js'; // 11.3 ModalSelectorLayout
import '../stories/ColorPicker.story.js'; // 11.5 Color Picker

// 12. Other
import '../stories/Badge'; // 12.1 Badge
import '../stories/CounterBadge'; //12.3 CounterBadge
import '../stories/Highlighter.story.js'; // 12.4 Highlighter
import '../stories/Tag.story.js'; // 12.5 Tag
import '../stories/FormField.story.js'; // FormField

// 13. Work in progress
import '../stories/Table'; // 13.1 Table Card

// TPA
import '../stories/TPA/Button';
import '../stories/TPA/FloatingTabs';
import '../stories/TPA/TextLink';
import '../stories/TPA/Input';
import '../stories/TPA/Label';

// DEPRECATED
import '../stories/LanguagePicker/index.story.js';
import '../stories/SideBar';
