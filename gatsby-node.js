const path = require("path")

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // console.log(`\n Node: `, node.internal.type)
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    console.log(`\n Node: `, fileNode.relativePath)
    const slug = createFilePath({ node, getNode, basePath: `` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const mediaTemplate = path.resolve(`src/templates/mediaTemplate.js`)
  const portfolioTemplate = path.resolve(`src/templates/portfolioTemplate.js`)
  const postTemplate = path.resolve(`src/templates/postTemplate.js`)

  return graphql(`
    {
      media: allMarkdownRemark(
        filter: {fileAbsolutePath: {glob: "**/data/media/*.md"}}) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      portfolio: allMarkdownRemark(
        filter: {fileAbsolutePath: {glob: "**/data/portfolio/*.md"}}) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      posts: allMarkdownRemark(
        filter: {fileAbsolutePath: {glob: "**/data/posts/*.md"}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.media.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: mediaTemplate,
        context: {
        },
      })
    })

    result.data.portfolio.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: portfolioTemplate,
        context: {
          slug: node.fields.slug,
        },
			})
		})

    result.data.posts.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: postTemplate,
        context: {
          slug: node.fields.slug,
          category: node.frontmatter.categories[1],
        },
			})
		})

  })
}
