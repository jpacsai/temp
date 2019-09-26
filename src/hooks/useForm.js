import { useState, useCallback } from 'react';

const getInvalidValidatorIndex = (value = null, validators = []) => {
  const invalidIndex = validators.findIndex(validator => {
    if (typeof validator === 'function') return !validator(value);
    if (validator instanceof RegExp) return !validator.test(value);
    return false;
  });

  return invalidIndex !== -1 ? invalidIndex : null;
};

const getIsValueValid = (value = null, { required, match, matchError, validators, errors } = {}, state = {}) => {
  if (required && !/\S/.test(value)) return 'This field is required';
  if (match && state[match] && state[match].value !== value) return matchError;
  if (validators) {
    const invalidIndex = getInvalidValidatorIndex(value, validators, state);
    return invalidIndex !== null ? errors[invalidIndex] : '';
  }
  return '';
};

const getIsStateValid = (validationSchema = {}, state = {}) => Object.keys(state).every(key => {
  const { value } = state[key];
  return getIsValueValid(value, validationSchema[key], state) === '';
});

const validateState = (stateSchema, validationSchema = {}, state = {}) => Object.keys(stateSchema).reduce((o, key) => ({
  ...o,
  [key]: {
    ...state[key],
    error: validationSchema[key] ? getIsValueValid(state[key].value, validationSchema[key], state) : '',
  },
}), {});

const useForm = (stateSchema = {}, validationSchema = {}, callback = () => {}) => {
  const [state, setState] = useState(stateSchema);

  const handleChange = event => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: {
        value,
        error: '',
      },
    }));
  };

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    const isStateValid = getIsStateValid(validationSchema, state);

    if (isStateValid) return callback(Object.keys(state).reduce((o, key) => ({ ...o, [key]: state[key].value }), {}));
    return setState(validateState(stateSchema, validationSchema, state));
  }, [state, stateSchema, validationSchema, callback]);

  return {
    state,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
