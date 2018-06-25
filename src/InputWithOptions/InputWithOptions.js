import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';
import omit from 'omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Highlighter from '../Highlighter/Highlighter';
import {chainEventHandlers} from '../utils/ChainEventHandlers';

class InputWithOptions extends WixComponent {

  // Abstraction
  inputClasses() {}
  dropdownClasses() {}
  dropdownAdditionalProps() {}
  inputAdditionalProps() {}
  /**
   * An array of key codes (default ['Enter','Tab']) that act as manual submit. Will be used with the onKeyDown(event), tha key codes are values of event.key. When a manual submit key is pressed then onManuallyInput will be called.
   */
  getManualSubmitKeys() {
    return ['Enter', 'Tab'];
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value || '',
      showOptions: false,
      lastOptionsShow: 0,
      isEditing: false
    };

    this._onSelect = this._onSelect.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onManuallyInput = this._onManuallyInput.bind(this);
    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);
    this._onInputClicked = this._onInputClicked.bind(this);
    this.closeOnSelect = this.closeOnSelect.bind(this);
    this.onCompositionChange = this.onCompositionChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.showOptionsIfEmptyInput &&
        ((!prevProps.value && this.props.value) || (!prevState.inputValue && this.state.inputValue))) {
      this.showOptions();
    }
  }

  onCompositionChange(isComposing) {
    this.setState({isComposing});
  }

  onClickOutside() {
    this.hideOptions();
  }

  renderInput() {
    const inputAdditionalProps = this.inputAdditionalProps();
    const inputProps = Object.assign(omit(Object.keys(DropdownLayout.propTypes).concat(['onChange', 'dataHook']), this.props), inputAdditionalProps);

    const {inputElement} = inputProps;
    return React.cloneElement(inputElement, {
      menuArrow: true,
      ref: input => this.input = input,
      ...inputProps,
      onKeyDown: chainEventHandlers(
        inputAdditionalProps && inputAdditionalProps.onKeyDown,
        this._onKeyDown),
      theme: this.props.theme,
      onChange: this._onChange,
      onInputClicked: this._onInputClicked,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onCompositionChange: this.onCompositionChange,
      width: inputElement.props.width,
      textOverflow: inputElement.props.textOverflow
    });
  }

  _processOptions(options) {
    return !this.props.highlight ? options : (
      options.map(option => {
        return {
          ...option,
          value: (
            <Highlighter match={this.state.inputValue} dataHook={`highlighter-${option.id}`}>
              {option.value}
            </Highlighter>
          )
        };
      })
    );
  }

  _renderDropdownLayout() {
    const inputOnlyProps = omit(['tabIndex'], Input.propTypes);
    const dropdownProps = Object.assign(omit(Object.keys(inputOnlyProps).concat(['dataHook']), this.props), this.dropdownAdditionalProps());

    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};

    if (this.props.dropdownWidth) {
      customStyle.width = this.props.dropdownWidth;
    }

    const isDropdownLayoutVisible = this.state.showOptions &&
      (this.props.showOptionsIfEmptyInput || this.state.inputValue.length > 0);

    return (
      <div className={this.dropdownClasses()} style={customStyle} data-hook="dropdown-layout-wrapper">
        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          {...dropdownProps}
          options={this._processOptions(dropdownProps.options)}
          theme={this.props.theme}
          visible={isDropdownLayoutVisible}
          onClose={this.hideOptions}
          onSelect={this._onSelect}
          isComposing={this.state.isComposing}
          />
      </div>
    );
  }

  render() {
    const {dropDirectionUp} = this.props;
    return (
      <div>
        {dropDirectionUp ? this._renderDropdownLayout() : null}
        <div data-input-parent className={this.inputClasses()}>
          {this.renderInput()}
        </div>
        {!dropDirectionUp ? this._renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    if (this.state.showOptions) {
      this.setState({showOptions: false});
    }
  }

  showOptions() {
    this.setState({showOptions: true, lastOptionsShow: Date.now()});
  }

  closeOnSelect() {
    return this.props.closeOnSelect;
  }

  get isReadOnly() {
    const {readOnly} = this.inputAdditionalProps() || {};
    return readOnly;
  }

  _onManuallyInput(inputValue = '') {
    if (this.state.isComposing) {
      return;
    }

    inputValue = inputValue.trim();
    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    const suggestedOption = this.props.options.find(
      element => element.value === inputValue
    );

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(inputValue, suggestedOption);
    }
  }

  _onSelect(option, isSelectedOption) {
    this.showOptions();
    const {onSelect} = this.props;

    if (this.closeOnSelect()) {
      this.setState({showOptions: false});
    }

    if (isSelectedOption) {
      this.setState({showOptions: false});
    } else if (onSelect) {
      onSelect(this.props.highlight ? this.props.options.find(opt => opt.id === option.id) : option);
    }
  }

  _onChange(event) {
    this.setState({inputValue: event.target.value});
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  _onInputClicked(event) {
    if (this.state.showOptions && (Date.now() - this.state.lastOptionsShow > 2000)) {
      this.hideOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  _onFocus(e) {
    if (this.props.disabled) {
      return;
    }
    this._focused = true;
    this.setState({isEditing: false});
    this.showOptions();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _onBlur(e) {
    this._focused = false;
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _onKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      this.setState({isEditing: true});
    }

    const shouldDelegate = !['Spacebar', ' '].includes(event.key) || this.isReadOnly;

    if (shouldDelegate && !this.dropdownLayout._onKeyDown(event)) {
      if (this.getManualSubmitKeys().indexOf(event.key) !== -1) {
        this._onManuallyInput(this.state.inputValue);
      } else {
        this.showOptions();
      }
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}

InputWithOptions.defaultProps = {
  ...Input.defaultProps,
  ...DropdownLayout.defaultProps,
  onSelect: () => {},
  options: [],
  closeOnSelect: true,
  inputElement: <Input/>,
  valueParser: option => option.value,
  dropdownWidth: null,
  dropdownOffsetLeft: '0',
  showOptionsIfEmptyInput: true
};

InputWithOptions.propTypes = {
  ...Input.propTypes,
  ...DropdownLayout.propTypes,
  autocomplete: PropTypes.string,
  inputElement: PropTypes.element,
  closeOnSelect: PropTypes.bool,
  onManuallyInput: PropTypes.func,
  valueParser: PropTypes.func,
  dropdownWidth: PropTypes.string,
  dropdownOffsetLeft: PropTypes.string,
  /** Controls whether to show options if input is empty */
  showOptionsIfEmptyInput: PropTypes.bool,
  highlight: PropTypes.bool
};

InputWithOptions.displayName = 'InputWithOptions';

export default InputWithOptions;
