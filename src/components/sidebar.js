import React from "react";
import layoutStyles from "./mediaLayout.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faInstagram,
  faGooglePlusG,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";

export default ({ children }) => (
  <div className={layoutStyles.sidebar}>
    {children &&
      <div className={layoutStyles.div25High} />
    }
    <div className={layoutStyles.row}>
      <div>
        <img
          src="/images/amith-bio-300x300.png"
          className={layoutStyles.bioPic}
          alt="Avatar"
        />
      </div>
    </div>
    <div className={layoutStyles.div10High} />
    <div className={layoutStyles.text}>
      <p className={layoutStyles.sayHi}>Hi there! Nice to meet you!</p>
      <p className={layoutStyles.sayHiText}>
        I'm Amith: former .Net developer, now full time freelancer/blogger. My
        wife and I live in Bengaluru, India. I love a good book, a quiet
        getaway, and a good laugh.{" "}
      </p>
    </div>
    <div className={layoutStyles.lineRed} />
    <div className={layoutStyles.text}>
      <h5>Let's Hang Out</h5>
    </div>
    <div className={layoutStyles.text}>
      <a
        className={classNames(layoutStyles.btnSocial, layoutStyles.linkedin)}
        href="https://www.linkedin.com/in/amith-raravi-82b525139"
      >
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className={layoutStyles.falinkedin}
        />
      </a>
      <a
        className={classNames(layoutStyles.btnSocial, layoutStyles.instagram)}
        href="https://www.instagram.com/the.raravi.chronicles"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className={layoutStyles.fainstagram}
        />
      </a>
      <a
        className={classNames(layoutStyles.btnSocial, layoutStyles.googleplus)}
        href="https://plus.google.com/+AmithRaravi"
      >
        <FontAwesomeIcon
          icon={faGooglePlusG}
          className={layoutStyles.fagoogleplus}
        />
      </a>
      <a
        className={classNames(layoutStyles.btnSocial, layoutStyles.facebook)}
        href="https://www.facebook.com/amith.raravi"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className={layoutStyles.fafacebook}
        />
      </a>
    </div>
    <div className={layoutStyles.div10High} />
    <div className={layoutStyles.text}>
      <a href="mailto:amith.raravi@gmail.com">
        <i>contact me</i>
      </a>
    </div>
    <div className={layoutStyles.div20High} />
    <div className={layoutStyles.lineRed} />
    {children}
    <div className={layoutStyles.text}>
      <h5>Blogger Resources</h5>
    </div>
    <div className={layoutStyles.bloggerResources}>
      <p>
        <a href="https://www.amithraravi.com/articles/tech/your-own-website-part-1/">
          {" "}
          ➤ Your own website - Part I
        </a>
        <br />
        <a href="https://www.amithraravi.com/articles/tech/your-own-website-part-2/">
          {" "}
          ➤ Your own website - Part II
        </a>
        <br />
        <a href="https://cookieandkate.com/how-to-start-a-blog/">
          {" "}
          ➤ How to Start any Blog
        </a>
        <br />
        <a href="https://www.bloggingbasics101.com/how-do-i-start-a-blog/">
          {" "}
          ➤ Blogging - Beginner’s Guide 2018
        </a>
        <br />
        <a href="https://makeawebsitehub.com/examples-of-blogs/">
          {" "}
          ➤ Examples of Blogs – 2018 Edition
        </a>
      </p>
    </div>
    <div className={layoutStyles.lineRed} />
  </div>
);
