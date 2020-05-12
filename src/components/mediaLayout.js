import React from "react";
import Layout from "./layout";
import layoutStyles from "./mediaLayout.module.scss";
import Sidebar from "./sidebar";

export default ({ children }) => (
  <Layout>
    <article>
      <div className={layoutStyles.div25High}></div>
      <div className={layoutStyles.mainbar}>{children}</div>
      <Sidebar />
    </article>
  </Layout>
);
