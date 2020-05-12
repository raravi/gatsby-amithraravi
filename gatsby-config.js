module.exports = {
  siteMetadata: {
    title: `Amith Raravi`,
    url: `https://www.amithraravi.com`,
    description: `Reader. Coder. Play a bit of chess, a movie here, a road-trip there :)`,
    owner: `Amith Raravi`,
    facebook: `https://www.facebook.com/amith.raravi`,
    twitter: `https://www.twitter.com/amith_raravi`,
    twitterusername: `amith_raravi`,
    teaser: `/images/teaser.jpg`,
    logo: `/images/amith-bio.png`
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: "markdown-media-pages"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-component",
            options: {
              components: ["about-grid", "advertising-article"]
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`
  ]
};
