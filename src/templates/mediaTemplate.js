import React from "react"
import rehypeReact from "rehype-react"
import SiteMetaData from "../components/siteMetaData"
import AboutGridComponent from "../components/aboutgrid"
import { graphql } from "gatsby"
import MediaLayout from "../components/mediaLayout"
import layoutStyles from "./media.module.scss"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "about-grid": AboutGridComponent }
}).Compiler

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, htmlAst } = markdownRemark
  return (
    <MediaLayout>
      <SiteMetaData title={frontmatter.title} pageURL={frontmatter.path} isArticle="false" />
      <div className={layoutStyles.mediaSection}>
        <div className={layoutStyles.div20High}></div>
        <div className={layoutStyles.lineRed}></div>
        <div>
          <h1>{frontmatter.title}</h1>
        </div>
        <div className={layoutStyles.div5High}></div>
        <div className={layoutStyles.lineRed}></div>
        <div className={layoutStyles.div20High}></div>
        <div id="content" className={layoutStyles.pageContent}>{renderAst(htmlAst)}</div>
      </div>
    </MediaLayout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
      }
    }
  }
`
