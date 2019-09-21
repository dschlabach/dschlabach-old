import React from "react"
import { Link, graphql } from "gatsby"

import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"

// const BlogPostTemplate = ({ data }) => {
//   // const post = data.markdownRemark
//   // const siteTitle = data.site.siteMetadata.title
//   // const { previous, next } = props.pageContext
//   return (
//     // <BlogLayout location={props.location} title={siteTitle}>
//     <BlogLayout>
//       <SEO
//         title={post.frontmatter.title}
//         description={post.frontmatter.description || post.excerpt}
//       />
//       <article>
//         <header>
//           <h1
//             style={{
//               // marginTop: rhythm(1),
//               marginBottom: 0,
//             }}
//           >
//             {post.frontmatter.title}
//           </h1>
//           <p
//             style={{
//               // ...scale(-1 / 5),
//               display: `block`,
//               // marginBottom: rhythm(1),
//             }}
//           >
//             {post.frontmatter.date}
//           </p>
//         </header>
//         <section dangerouslySetInnerHTML={{ __html: post.html }} />
//         <hr
//           style={
//             {
//               //   marginBottom: rhythm(1),
//             }
//           }
//         />
//         <footer>{/* <Bio /> */}</footer>
//       </article>

//       <nav>
//         <ul
//           style={{
//             display: `flex`,
//             flexWrap: `wrap`,
//             justifyContent: `space-between`,
//             listStyle: `none`,
//             padding: 0,
//           }}
//         >
//           <li>
//             {previous && (
//               <Link to={previous.fields.slug} rel="prev">
//                 ← {previous.frontmatter.title}
//               </Link>
//             )}
//           </li>
//           <li>
//             {next && (
//               <Link to={next.fields.slug} rel="next">
//                 {next.frontmatter.title} →
//               </Link>
//             )}
//           </li>
//         </ul>
//       </nav>
//     </BlogLayout>
//   )
// }

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <BlogLayout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="mt-6">
          <header>
            <h1 className="font-bold text-3xl">{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>{/* <Bio /> */}</footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </BlogLayout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
export default BlogPostTemplate
