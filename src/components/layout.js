import React from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import layoutStyles from "./layout.module.scss";
import classNames from "classnames";

var moment = require('moment');

class MenuButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { isClicked: false };
  }

  handleClick(e) {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    return (
      <>
        <nav
          role="navigation"
          id="js-menu"
          className={
            this.state.isClicked
              ? classNames(
                  layoutStyles.slidingMenuContent,
                  layoutStyles.isVisible
                )
              : layoutStyles.slidingMenuContent
          }
        >
          <h5>
            {this.props.data.site.siteMetadata.title}{" "}
            <span>Table of Contents</span>
          </h5>
          <ul className={layoutStyles.menuItem}>
            {this.props.data.allNavigationYaml.edges.map(({ node }) => (
              <li>
                <Link to={node.url}>
                  <img
                    src={node.image}
                    alt="teaser"
                    className={layoutStyles.teaser}
                  />
                  <div className={layoutStyles.title}>{node.title}</div>
                  <p className={layoutStyles.excerpt}>{node.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={this.handleClick}
          type="button"
          id="js-menu-trigger"
          className={
            this.state.isClicked
              ? classNames(
                  layoutStyles.slidingMenuButton,
                  layoutStyles.linesButton,
                  layoutStyles.x2,
                  layoutStyles.slide,
                  layoutStyles.close
                )
              : classNames(
                  layoutStyles.slidingMenuButton,
                  layoutStyles.linesButton,
                  layoutStyles.x2
                )
          }
          aria-label="Toggle Navigation"
        >
          <span className={layoutStyles.navLines} />
        </button>
        <div
          id="js-menu-screen"
          className={
            this.state.isClicked
              ? classNames(layoutStyles.menuScreen, layoutStyles.isVisible)
              : layoutStyles.menuScreen
          }
        />
      </>
    );
  }
}

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query layoutQuery {
        site {
          siteMetadata {
            title
            url
          }
        }
        allNavigationYaml {
          edges {
            node {
              title
              url
              excerpt
              image
            }
          }
        }
        allFooterYaml {
          edges {
            node {
              title
              url
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <header id="masthead" className={layoutStyles.headerSection}>
          <div className={layoutStyles.header}>
            <a href="/" className={layoutStyles.siteTitle}>
              {data.site.siteMetadata.title}
            </a>
            <nav role="navigation" className={layoutStyles.menu}>
              <ul className={layoutStyles.topMenu}>
                {data.allNavigationYaml.edges.map(({ node }) => (
                  <li className={layoutStyles.topMenuItemLink}>
                    <Link to={node.url}>{node.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={layoutStyles.div20High} />
          <div className={layoutStyles.lineRed} />
        </header>
        <MenuButton data={data} />
        <div className={layoutStyles.mainSection}>{children}</div>
        <footer role="contentinfo" className={layoutStyles.footerSection}>
          <nav role="navigation" className={layoutStyles.footer}>
            <ul className={layoutStyles.bottomMenu}>
              {data.allFooterYaml.edges.map(({ node }) => (
                <li>
                  <Link
                    to={node.url}
                    className={layoutStyles.bottomMenuItemLink}
                  >
                    {node.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={layoutStyles.div10High} />
          <div className={layoutStyles.lineRed} />
          <p className={layoutStyles.copyright}>
            &#169; {moment().format('YYYY')} <a href="/">{data.site.siteMetadata.title}</a> powered
            by{" "}
            <a href="https://www.gatsbyjs.org" rel="nofollow">
              Gatsby
            </a>
            .
          </p>
        </footer>
        <script src="/js/vendor/jquery-1.9.1.min.js" />
        <script src="/js/vendor/isotope.pkgd.min.js" />
        <script src="/js/vendor/imagesloaded.pkgd.min.js" />
        <script src="/js/main.js" />
      </>
    )}
  />
);
