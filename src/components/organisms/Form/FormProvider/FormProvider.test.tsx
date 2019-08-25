import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Form from '../Form';

const onSubmit = jest.fn();
const fieldLabel = 'First name';
const testId = 'test-form';

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

const renderComponent = () =>
  render(
    <Form.Provider data-testid={testId} validate={validate} initialValues={{ firstName: '' }} onSubmit={onSubmit}>
      <Form.TextField label={fieldLabel} name="firstName" />
    </Form.Provider>,
  );

describe('<Form.Provider />', () => {
  beforeEach(() => {
    onSubmit.mockReset();
  });

  it('calls onSubmit callback', async () => {
    const { getByTestId, getByLabelText } = renderComponent();
    const value = 'name';
    act(() => {
      fireEvent.change(getByLabelText(fieldLabel), { target: { value } });
    });
    act(() => {
      fireEvent.submit(getByTestId(testId));
    });
    expect(onSubmit).toHaveBeenCalledWith({ firstName: value });
  });

  it('does not call onSubmit if the form is invalid', () => {
    const { getByTestId } = renderComponent();
    act(() => {
      fireEvent.submit(getByTestId(testId));
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
