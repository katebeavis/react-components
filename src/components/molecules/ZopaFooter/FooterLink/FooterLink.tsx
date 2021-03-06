import styled from 'styled-components';
import * as colors from '../colors';
import Link from '../../../atoms/Link/Link';

const FooterLink = styled(Link).attrs({
  size: 'base',
  weight: 'semibold',
})`
  color: ${colors.neutral200};
  transition: color 0.2s ease;
  display: block;
  padding: 5px 0;

  &:hover {
    color: ${colors.neutral400};
  }
`;

export default FooterLink;
