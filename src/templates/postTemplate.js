import React from "react";
import rehypeReact from "rehype-react";
import SiteMetaData from "../components/siteMetaData";
import AdvertisingArticleComponent from "../components/advertisingarticle";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import layoutStyles from "./media.module.scss";
import mediaStyles from "../components/mediaLayout.module.scss";
import postStyles from "./postTemplate.module.scss";
import Sidebar from "../components/sidebar";

var moment = require("moment");

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "advertising-article": AdvertisingArticleComponent }
}).Compiler;

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { fields, frontmatter, htmlAst } = markdownRemark;
  return (
    <Layout>
      <SiteMetaData
        title={frontmatter.title}
        pageURL={fields.slug}
        isArticle="true"
        excerpt={frontmatter.excerpt}
        teaser={frontmatter.teaser}
        category={frontmatter.categories[1]}
        date={frontmatter.date}
        modified={frontmatter.modified}
      />
      <article>
        <div className={mediaStyles.mainbar}>
          <div className={layoutStyles.mediaSection}>
            <nav className={layoutStyles.breadcrumbs}>
              <a href="/">Home</a> › <a href="/articles/">Articles</a>
            </nav>
            <div className={layoutStyles.div10High}></div>
            <div className={layoutStyles.lineRed} />
            <div>
              <h1>{frontmatter.title}</h1>
              <p className={postStyles.pageMeta}>
                <time dateTime={moment(frontmatter.date).format()}>
                  {frontmatter.datePublished}
                </time>
              </p>
            </div>
            <div className={layoutStyles.div15High} />
            <div className={layoutStyles.lineRed} />
            <div className={layoutStyles.div20High} />
            <div id="content" className={layoutStyles.pageContent}>
              {renderAst(htmlAst)}
            </div>
            <hr />
          </div>
        </div>
        <Sidebar>
          <div className={mediaStyles.text}>
            <h5>
              Posts -{" "}
              {data.markdownRemark.frontmatter.categories[1] === "tech"
                ? "Personal"
                : "Tech"}
            </h5>
          </div>
          <div className={postStyles.sidebarLatestPosts}>
            {data.latestPosts.edges.map(({ node }) => {
              const latestPostsSRC = `${node.frontmatter.teaser}`;
              return (
                <div>
                  <article className={postStyles.sidebarTile}>
                    <a href={node.fields.slug} title={node.frontmatter.title}>
                      <p className={postStyles.postTeaser}>
                        <img src={latestPostsSRC} alt="teaser" />
                      </p>
                      <h2 className={postStyles.postTitle}>
                        {node.frontmatter.title}
                      </h2>
                      <p className={postStyles.postExcerpt}>
                        {node.frontmatter.excerpt}
                      </p>
                    </a>
                  </article>
                </div>
              );
            })}
          </div>
          <div className={mediaStyles.div10High} />
          <div className={mediaStyles.lineRed} />
        </Sidebar>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!, $category: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      htmlAst
      frontmatter {
        title
        author
        date
        datePublished: date(formatString: "Do MMMM YYYY")
        modified
        categories
        tags
        image
        teaser
        excerpt
      }
    }
    latestPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/data/posts/*.md" }
        fields: { slug: { ne: $slug } }
        frontmatter: { categories: { ne: $category } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            teaser
            date
            categories
            excerpt
          }
        }
      }
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`;
