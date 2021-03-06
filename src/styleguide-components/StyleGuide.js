import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'clsx';
import Ribbon from 'rsg-components/Ribbon';
import Version from 'rsg-components/Version';

import GlobalStyles from '../components/styles/GlobalStyles';
import Fonts from '../components/styles/Fonts';

const GlobalStyleGuideStyles = createGlobalStyle`
  /* System Fonts as used by GitHub */
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const styles = ({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) => ({
  root: {
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    paddingLeft: sidebarWidth,
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: color.sidebarBackground,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: sidebarWidth,
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  logo: {
    padding: space[2],
    borderBottom: [[1, color.border, 'solid']],
  },
  footer: {
    display: 'block',
    color: color.light,
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
});

const footerText = homepageUrl => `
<sub>Generated with [React Styleguidist](${homepageUrl}) for [Zopa's react-components](https://github.com/zopaUK/react-components). \
No permission is granted to use the trade names, trademarks, service marks, or product names of Zopa, except as required
for reasonable and customary use in describing the origin of this library and reproducing the content of the notice in
the [license](https://github.com/zopaUK/react-components/blob/master/LICENSE).</sub>
`;

export function StyleGuideRenderer({ classes, title, version, homepageUrl, children, toc, hasSidebar }) {
  return (
    <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
      <GlobalStyles />
      <GlobalStyleGuideStyles />
      <Fonts />
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown text={footerText(homepageUrl)} />
        </footer>
      </main>
      {hasSidebar && (
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <Logo>{title}</Logo>
            {version && <Version>{version}</Version>}
          </div>
          {toc}
        </div>
      )}
      <Ribbon />
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);
