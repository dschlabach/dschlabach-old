import React from "react"

import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"

const crypto = () => {
  return (
    <BlogLayout>
      <SEO title="Crypto" />
      <h1 className="font-display font-bold text-3xl">Crypto</h1>
      <p>
        In October 2020, I started learning about cryptocurrency. I'm
        documenting my learnings here.
      </p>
      <p>
        You can also follow me on{" "}
        <a href="https://twitter.com/dschlabach">Twitter</a>.
      </p>
    </BlogLayout>
  )
}

export default crypto
