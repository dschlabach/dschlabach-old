import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="flex text-deepBlue font-semibold font-display ">
    <div className="py-3 mx-4">
      <h1 className="text-2xl md:text-3xl leading-none font-black text-deepBlue">
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Daniel Schlabach`,
}

export default Header
