import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Header from "./header"
import "./layout.css"
import "./index.css"

const BlogLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQueryBlog {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto flex-1 flex flex-col content-center container lg:max-w-3xl">
        <main className="w-full flex-1">
          <Header></Header>
          {children}
        </main>
        <footer className="mt-4 text-center py-2 font-body">
          <Link className="mx-2 font-body underline" to="/blog/">
            Articles
          </Link>
          © {new Date().getFullYear()}, Daniel Schlabach
        </footer>
      </div>
    </div>
  )
}

BlogLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlogLayout
