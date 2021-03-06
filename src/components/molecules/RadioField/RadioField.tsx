import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../../constants/colors';
import { getBorderColorByStatus } from '../../../helpers/utils';
import InputLabel from '../../atoms/InputLabel/InputLabel';
import SizedContainer from '../../layout/SizedContainer/SizedContainer';
import { IField, IInputStatus } from '../../types';

const zoomIn = keyframes`
  from {
    transform: scale(1.9);
  }
  to {
    transform: scale(1);
  }
`;

const FieldContainer = styled(SizedContainer)`
  position: relative;
`;

const Label = styled(InputLabel)<IInputStatus>`
  display: flex;
  line-height: 1.4;
  color: ${colors.neutral.dark};
  font-weight: 400;
  position: relative;

  &:before {
    content: '';
    background-color: ${colors.neutral.light};
    border-radius: 50%;
    height: 24px;
    width: 24px;
    min-width: 24px;
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
    border: 2px ${getBorderColorByStatus} solid;
  }
  &:hover {
    cursor: pointer;
    &:before {
      border: 2px solid ${colors.neutral.medium};
    }
  }
`;

const Input = styled.input<IInputStatus>`
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
  position: absolute;
  &:hover + label,
  &:focus + label {
    &:before {
      border: 2px ${colors.base.secondary} solid;
    }
  }
  &:checked + label {
    font-weight: 600;
    &:before {
      content: '';
      background-color: ${colors.base.secondary};
      border: 2px ${colors.base.secondary} solid;
      border-radius: 50%;
      height: 24px;
      width: 24px;
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }
    &:after {
      content: '';
      background-color: ${colors.neutral.white};
      border-radius: 50%;
      height: 8px;
      width: 8px;
      display: inline-block;
      animation: ${zoomIn} 120ms ease-in-out;
      left: 8px;
      top: 8px;
      position: absolute;
    }
  }
  &:disabled + label {
    color: ${colors.neutral.medium};
    &:before {
      border-color: ${colors.neutral.medium};
      background-color: ${colors.neutral.light};
    }
    &:hover {
      cursor: not-allowed;
    }
  }
`;

export interface IRadioField extends IField, IInputStatus {}

const RadioField: FC<IRadioField> = ({ label, hasError, errorMessage, isValid, inputProps, ...rest }) => {
  const { value } = inputProps;

  if (!inputProps.value) throw Error('Value must be set in inputProps. Check the docs.');

  return (
    <FieldContainer {...rest}>
      <Input id={`radio-id-${value}`} hasError={hasError} isValid={isValid} type="radio" {...inputProps} />
      <Label htmlFor={`radio-id-${value}`} hasError={hasError} isValid={isValid}>
        {label}
      </Label>
    </FieldContainer>
  );
};

export default RadioField;
