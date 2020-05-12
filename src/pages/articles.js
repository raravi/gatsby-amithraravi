import React from "react";
import { graphql } from "gatsby";
import SiteMetaData from "../components/siteMetaData";
import AdvertisingGrid from "../components/advertisinggrid";
import Layout from "../components/layout";
import mediaStyles from "./mediaPage.module.scss";
import gridStyles from "./isotopeGrid.module.scss";
import classNames from "classnames";

class ArticleFilters extends React.Component {
  constructor() {
    super();
    this.handleClickAll = this.handleClickAll.bind(this);
    this.handleClickTech = this.handleClickTech.bind(this);
    this.handleClickPersonal = this.handleClickPersonal.bind(this);
    this.state = {
      isClickedAll: true,
      isClickedTech: false,
      isClickedPersonal: false
    };
  }

  componentDidMount() {
    if (typeof window !== `undefined`) {
      const Isotope = require("isotope-layout/js/isotope");
      this.iso = new Isotope(`.${mediaStyles.articlesTiles}`, {
        itemSelector: `.${mediaStyles.col}`,
        layoutMode: "fitRows"
      });
    }
  }

  handleClickAll(e) {
    this.setState({
      isClickedAll: true,
      isClickedTech: false,
      isClickedPersonal: false
    });
    this.iso.arrange({ filter: "*" });
  }

  handleClickTech(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: true,
      isClickedPersonal: false
    });
    this.iso.arrange({ filter: `.${gridStyles.tech}` });
  }

  handleClickPersonal(e) {
    this.setState({
      isClickedAll: false,
      isClickedTech: false,
      isClickedPersonal: true
    });
    this.iso.arrange({ filter: `.${gridStyles.personal}` });
  }

  render() {
    return (
      <div className={gridStyles.filtersButtonGroup}>
        <button
          onClick={this.handleClickAll}
          className={
            this.state.isClickedAll
              ? classNames(gridStyles.filtersButton, gridStyles.isChecked)
              : gridStyles.filtersButton
          }
        >
          All
        </button>
        <button
          onClick={this.handleClickTech}
          className={
            this.state.isClickedTech
              ? classNames(gridStyles.filtersButton, gridStyles.isChecked)
              : gridStyles.filtersButton
          }
        >
          Tech
        </button>
        <button
          onClick={this.handleClickPersonal}
          className={
            this.state.isClickedPersonal
              ? classNames(gridStyles.filtersButton, gridStyles.isChecked)
              : gridStyles.filtersButton
          }
        >
          Personal
        </button>
      </div>
    );
  }
}

export default ({ data }) => {
  const title = "Articles";
  return (
    <Layout>
      <SiteMetaData
        title={title}
        pageURL="/articles/"
        isArticle="false"
        posts={data.posts}
      />
      <div className={mediaStyles.div20High} />
      <div className={mediaStyles.pageTitle}>
        <h2>{title}</h2>
      </div>
      <div className={mediaStyles.pageContent}>
        <ArticleFilters />
        <div className={mediaStyles.articlesTiles}>
          {data.posts.edges.map(({ node }, index) => {
            const src = `${node.frontmatter.teaser}`;
            let gridColumn = gridStyles.personal;
            const index1 = index + 1;
            if (node.frontmatter.categories[1] === "tech")
              gridColumn = gridStyles.tech;
            return (
              <>
                {index1 % 6 === 0 && (
                  <div
                    className={classNames(
                      mediaStyles.col,
                      gridStyles.personal,
                      gridStyles.tech
                    )}
                  >
                    <AdvertisingGrid />
                  </div>
                )}
                <div className={classNames(mediaStyles.col, gridColumn)}>
                  <article className={mediaStyles.articleTile}>
                    <a href={node.fields.slug} title={node.frontmatter.title}>
                      <p className={mediaStyles.postTeaser}>
                        <img src={src} alt="teaser" />
                      </p>
                      <p className={mediaStyles.entryDate}>
                        <time dateTime={node.frontmatter.date}>
                          {node.frontmatter.date}
                        </time>
                      </p>
                      <h2 className={mediaStyles.postTitle}>
                        {node.frontmatter.title}
                      </h2>
                      <p className={mediaStyles.postExcerpt}>
                        {node.frontmatter.excerpt}
                      </p>
                    </a>
                  </article>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/data/posts/*.md" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            date(formatString: "Do MMMM YYYY")
            teaser
            categories
          }
        }
      }
    }
  }
`;
