import React from "react";
import { graphql } from "gatsby";
import SiteMetaData from "../components/siteMetaData";
import Layout from "../components/layout";
import mediaStyles from "./mediaPage.module.scss";

export default ({ data }) => {
  const title = "Portfolio";
  return (
    <Layout>
      <SiteMetaData title={title} pageURL="/portfolio/" isArticle="false" />
      <div className={mediaStyles.div20High}></div>
      <div className={mediaStyles.pageTitle}>
        <h2>{title}</h2>
      </div>
      <div className={mediaStyles.pageContent}>
        <div className={mediaStyles.articlesTiles}>
          {data.posts.edges.map(({ node }) => {
            const src = `${node.frontmatter.teaser}`;
            return (
              <div className={mediaStyles.col}>
                <article className={mediaStyles.articleTile}>
                  <a href={node.fields.slug} title={node.frontmatter.title}>
                    <p className={mediaStyles.postTeaser}>
                      <img src={src} alt="teaser" />
                    </p>
                    <p className={mediaStyles.entryDate}>
                      <time datetime={node.frontmatter.date}>
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
      filter: { fileAbsolutePath: { glob: "**/data/portfolio/*.md" } }
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
          }
        }
      }
    }
  }
`;
