import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import Select from 'react-select/async';

export default function AsyncSelect({ name, defaultOptions, ...rest }) {
  const selectRef = useRef();
  const { defaultValue, registerField } = useField(name);

  useEffect(() => {
    if (selectRef.current) {
      registerField({
        name,
        ref: selectRef.current,
        path: 'select.state.value.value',
        getValue: ref => {
          if (!ref.select.state.inputValue) {
            return '';
          }
          return ref.select.state.inputValue;
        },
      });
    }
  }, [name, selectRef, registerField, rest.isMulti]);

  const filterOptions = inputValue => {
    return defaultOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterOptions(inputValue));
    });

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      defaultInputValue="Lucas"
      defaultOptions={defaultOptions}
      loadOptions={promiseOptions}
      ref={selectRef}
      {...rest}
    />
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultOptions: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};
