import React from "react"
import { graphql } from "gatsby"
import SiteMetaData from "../components/siteMetaData"
import MediaLayout from "../components/mediaLayout"
import layoutStyles from "./media.module.scss"
import portfolioStyles from "./portfolio.module.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { fields, frontmatter, html } = markdownRemark
  const src = `${frontmatter.image}`
  return (
    <MediaLayout>
      <SiteMetaData
        title={frontmatter.title}
        pageURL={fields.slug}
        isArticle="false"
        teaser={frontmatter.teaser}
      />
      <div className={layoutStyles.mediaSection}>
        <div className={layoutStyles.div20High}></div>
        <div>
          <img src={src} alt={frontmatter.title} className={portfolioStyles.pageImage} />
        </div>
        <nav className={layoutStyles.breadcrumbs}>
          <a href="/">Home</a> › <a href="/portfolio/">Portfolio</a>
        </nav>
        <div className={layoutStyles.lineRed}></div>
        <div>
          <h1>{frontmatter.title}</h1>
        </div>
        <div className={layoutStyles.div5High}></div>
        <div className={layoutStyles.lineRed}></div>
        <div className={layoutStyles.div20High}></div>
        <div id="content" className={layoutStyles.pageContent} dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
      </div>
    </MediaLayout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        date
        teaser
        image
      }
    }
  }
`
