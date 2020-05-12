import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

var moment = require('moment');

export default props => (
  <StaticQuery
    query={graphql`
      query metadataQuery {
        site {
          siteMetadata {
            title
            url
            description
            owner
            facebook
            twitter
            twitterusername
            logo
          }
        }
        posts: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/data/posts/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      const articlesJSONstart = `
        {
          "@context":"http://schema.org",
          "@type":"ItemList",
          "itemListElement":[`;
      const articlesJSONarray = data.posts.edges.map(
        ({ node }, index) =>
          `
            {
              "@type":"ListItem",
              "position":${index + 1},
              "url":"${data.site.siteMetadata.url}${node.fields.slug}"
            }`
      );
      const articlesJSONend = `
          ]
        }
        `;
      const articlesJSON =
        articlesJSONstart + articlesJSONarray + articlesJSONend;
      var modified = moment(props.date).format();
      if (props.modified) modified = moment(props.modified).format();
      const owner = data.site.siteMetadata.owner;
      var title = data.site.siteMetadata.title;
      if (props.title) title = props.title;
      var description = data.site.siteMetadata.description;
      if (props.isArticle === "true") description = props.excerpt;
      const url = `${data.site.siteMetadata.url}${props.pageURL}`;
      var image = `${data.site.siteMetadata.url}${data.site.siteMetadata.logo}`;
      if (props.teaser) image = `${data.site.siteMetadata.url}${props.teaser}`;
      return (
        <Helmet>
          <title>
            {props.title
              ? `${props.title} • ${data.site.siteMetadata.title}`
              : data.site.siteMetadata.title}
          </title>
          <meta name="description" content={description} />
          <link rel="canonical" href={url} />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:type"
            content={props.isArticle === "true" ? "article" : "website"}
          />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta
            property="og:site_name"
            content={data.site.siteMetadata.title}
          />
          {props.isArticle === "true" && (
            <meta
              property="article:publisher"
              content={data.site.siteMetadata.facebook}
            />
          )}
          {props.isArticle === "true" && (
            <meta property="article:section" content={props.category} />
          )}
          {props.isArticle === "true" && (
            <meta property="article:published_time" content={moment(props.date).format()} />
          )}
          {props.isArticle === "true" && (
            <meta property="article:modified_time" content={modified} />
          )}
          <meta property="og:image" content={image} />
          <meta property="og:image:secure_url" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:site"
            content={`@${data.site.siteMetadata.twitterusername}`}
          />
          <meta name="twitter:image" content={image} />
          <meta
            name="twitter:creator"
            content={
              props.author
                ? `@${props.author}`
                : `@${data.site.siteMetadata.twitterusername}`
            }
          />
          <link
            href={`${data.site.siteMetadata.url}/feed.xml`}
            type="application/atom+xml"
            rel="alternate"
            title={`${data.site.siteMetadata.title} Atom Feed`}
          />
          <link
            href={`${data.site.siteMetadata.url}/sitemap.xml`}
            type="application/xml"
            rel="sitemap"
            title="Sitemap"
          />

          <script type="application/ld+json">{`
          {
            "@context": "http://schema.org",
            "@type": "Person",
            "name": ${data.site.siteMetadata.title},
            "url": ${data.site.siteMetadata.url},
            "sameAs": [
              "https://www.linkedin.com/in/amith-raravi-82b525139",
              "https://github.com/raravi",
              "https://www.instagram.com/the.raravi.chronicles",
              "https://www.twitter.com/amith_raravi",
              "https://plus.google.com/+AmithRaravi",
              "https://www.facebook.com/amith.raravi",
              "https://www.goodreads.com/user/show/12212283-amith-raravi",
              "https://runkeeper.com/user/raravi"
            ]
          }
        `}</script>

          {props.title === "Articles" && (
            <script type="application/ld+json">{articlesJSON}</script>
          )}

          {props.isArticle === "true" && (
            <script type="application/ld+json">{`
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "${data.site.siteMetadata.owner}",
                "item": "${data.site.siteMetadata.url}"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Articles",
                "item": "${data.site.siteMetadata.url}/articles/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "${props.title}",
                "item": "${data.site.siteMetadata.url}${props.pageURL}"
              }
            ]
          }
        `}</script>
          )}

          {props.isArticle === "true" && (
            <script type="application/ld+json">{`
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${data.site.siteMetadata.url}${props.pageURL}"
            },
            "headline": "${props.excerpt}",
            "image": "${data.site.siteMetadata.url}${props.teaser}",
            "datePublished": "${moment(props.date).format()}",
            "dateModified": "${modified}",
          	"author": {
              "@type": "Person",
              "name": "${owner}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "${data.site.siteMetadata.title}",
              "logo": {
                "@type": "ImageObject",
                "url": "${
                  data.site.siteMetadata.url
                }/images/amith-bio-300x300.png"
              }
            },
          	"description": "${props.excerpt}"
          }
        `}</script>
          )}
        </Helmet>
      );
    }}
  />
);
