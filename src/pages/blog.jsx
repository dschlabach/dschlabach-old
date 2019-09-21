import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"

const BlogPostsPage = () => {
  const data = useStaticQuery(graphql`
    query BlogPostQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              description
            }
            fields {
              slug
            }
            timeToRead
          }
        }
      }
    }
  `)
  console.log(data.allMarkdownRemark)

  return (
    <BlogLayout>
      <SEO title="Blog Posts" />
      <div className="mt-10 px-4" style={{ maxWidth: 960 }}>
        {data.allMarkdownRemark.edges.map(post => {
          return (
            <article className="mt-8">
              <header>
                <h2 className="text-3xl font-bold">
                  <Link to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </Link>
                </h2>
                <small>
                  {post.node.frontmatter.date} &#8226; {post.node.timeToRead}{" "}
                  {post.node.timeToRead === 1 ? `minute` : `minute`} read
                </small>
              </header>
              <p>{post.node.frontmatter.description}</p>
            </article>
          )
        })}
      </div>
    </BlogLayout>
  )
}

export default BlogPostsPage
