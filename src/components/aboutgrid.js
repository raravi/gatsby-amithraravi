import React from "react";
import { StaticQuery, graphql } from "gatsby";
import gridStyles from "./aboutgrid.module.scss";

export default () => (
  <StaticQuery
    query={graphql`
      query aboutgridQuery {
        allAboutgridYaml {
          edges {
            node {
              title
              excerpt {
                node1 {
                  skills
                  points {
                    node2
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className={gridStyles.gridrow}>
        {data.allAboutgridYaml.edges.map(({ node }) => (
          <div className={gridStyles.twoColumn}>
            <h4>{node.title}</h4>
            <p>
              <ul>
                {node.excerpt.map(({ node1 }) => (
                  <li>
                    <h5>{node1.skills}</h5>
                    <ol>
                      {node1.points.map(({ node2 }) => (
                        <li>{node2}</li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    )}
  />
);
