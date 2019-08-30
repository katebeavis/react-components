import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Form from '..';

interface TForm {
  firstName: string;
}

const validate = (values: TForm) => {
  let errors: Partial<TForm> = {};
  if (!values.firstName) {
    errors.firstName = 'This field is required';
  }
  return errors;
};

const onSubmit = jest.fn();
const buttonLabel = 'continue';
const fieldLabel = 'First name';

const renderComponent = () =>
  render(
    <Form initialValues={{ firstName: '' }} validate={validate} onSubmit={onSubmit}>
      <Form.TextField label={fieldLabel} name="firstName" />
      <Form.Button>{buttonLabel}</Form.Button>
    </Form>,
  );

describe('<Form.Button />', () => {
  it('renders disabled button', () => {
    const { getByText } = renderComponent();
    expect(getByText(buttonLabel)).toBeDisabled();
  });

  it('renders enabled button', () => {
    const { getByText, getByLabelText } = renderComponent();
    act(() => {
      fireEvent.change(getByLabelText(fieldLabel), { target: { value: 'name' } });
    });
    expect(getByText(buttonLabel)).not.toBeDisabled();
  });

  it('calls onSubmit callback', () => {
    const { getByText, getByLabelText } = renderComponent();
    const value = 'name';
    act(() => {
      fireEvent.change(getByLabelText(fieldLabel), { target: { value } });
    });
    act(() => {
      fireEvent.click(getByText(buttonLabel));
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ firstName: value });
  });
});
