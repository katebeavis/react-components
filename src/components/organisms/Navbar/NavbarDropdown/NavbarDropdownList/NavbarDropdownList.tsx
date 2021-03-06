import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../constants/colors';

export type TAlignedTo = 'left' | 'right';

export interface INavbarDropdownListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Determines whether it's aligned to left or right
   */
  alignedTo: TAlignedTo;
}

const NavbarDropdownList = styled.ul<INavbarDropdownListProps>`
  position: relative;
  list-style-type: none;
  margin: 0;
  background-color: ${colors.neutral.white};
  box-shadow: inset 0 0 0 1px rgba(214, 215, 222, 0.75), 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  padding: 16px;
  border-radius: 4px;
  min-width: 150px;
  &:after {
    z-index: 1;
    content: '';
    top: 1px;
    ${({ alignedTo }) => alignedTo}: 16px;
    position: absolute;
    width: 15px;
    height: 15px;
    transform: translateY(-50%) rotate(135deg);
    background-color: inherit;
    box-shadow: -1px 1px 0 0 ${colors.neutral.light};
  }
`;

export default NavbarDropdownList;
