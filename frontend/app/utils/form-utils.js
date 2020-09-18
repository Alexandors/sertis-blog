import React from 'react';
import { Form } from 'react-bootstrap';
import { fromJS } from 'immutable';
import Select from 'react-select';
import classnames from 'classnames';
import { dropdownListCustomStyles, dropdownListCustomComponents } from 'global-constants';

export const renderFormTextbox = ({
  input,
  meta: { touched, error },
  label,
  required,
  type,
  ...props
}) => (
  <Form.Group controlId="">
    <Form.Label className={classnames({ 'form-required': required })}>
      {label}
    </Form.Label>
    <Form.Control
      {...input}
      {...props}
      type={type || 'text'}
      onChange={input.onChange}
      isInvalid={touched && error}
      placeholder={label}
    />
    <Form.Control.Feedback type="invalid">
      <span data-testid={`${input.name}-invalid-label`}>{error}</span>
    </Form.Control.Feedback>
  </Form.Group>
);

export const renderSingleSelect = ({
  input,
  meta: { touched, error },
  options,
  label,
  required,
  placeholder,
  isLoading,
  classNamePrefix,
  onInputChange,
  noOptionsMessage,
  dataTestId,
}) => {
  const selectedOption = options.find((option) => option.value === input.value);

  return (
    <Form.Group
      controlId="formSingleSelect"
      className={classnames({ 'is-error': touched && error })}
      data-testid={dataTestId}
    >
      <Form.Label className={classnames({ 'form-required': required })}>{label}</Form.Label>
      <Select
        {...input}
        simpleValue
        className="single-select"
        classNamePrefix={classNamePrefix}
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        onChange={(value) => input.onChange(value.value)}
        onInputChange={onInputChange}
        onBlur={() => input.onBlur(input.value)}
        isLoading={isLoading}
        styles={dropdownListCustomStyles}
        components={dropdownListCustomComponents}
        noOptionsMessage={() => noOptionsMessage}
      />
      <Form.Control.Feedback type="invalid">
        <span>{error}</span>
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const renderMultiSelect = ({
  input,
  meta: { touched, error },
  options,
  label,
  required,
  placeholder,
  isLoading,
  isMulti,
  isClearable,
  noOptionsMessage,
}) => {
  const selectedOption = input.value.toJS();
  return (
    <Form.Group
      controlId="formMultiSelect"
      className={classnames({ 'is-error': touched && error })}
    >
      <Form.Label className={classnames({ 'form-required': required })}>{label}</Form.Label>
      <Select
        {...input}
        simpleValue
        className="multi-select"
        classNamePrefix="multi-select"
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        onChange={(value) => input.onChange(fromJS(value || []))}
        onBlur={() => input.onBlur(input.value)}
        isLoading={isLoading}
        styles={dropdownListCustomStyles}
        components={dropdownListCustomComponents}
        isMulti={isMulti}
        isClearable={isClearable}
        closeMenuOnSelect={false}
        maxMenuHeight={240}
        noOptionsMessage={() => noOptionsMessage}
      />
      <Form.Control.Feedback type="invalid">
        <span>{error}</span>
      </Form.Control.Feedback>
    </Form.Group>
  );
};
