import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

import ComponentDocumentCategoryNav from "../components/ComponentDocumentCategoryNav";
// import EditLink from "../components/EditLink";
import SEO from "../components/SEO";
import TableOfContents from "../components/TableOfContents";
import * as style from "./ComponentCommon.css";

export const query = graphql`
  query ComponentUsage($id: String) {
    componentMetaJson(id: { eq: $id }) {
      name
      description
      platform {
        docs {
          usage {
            mdx {
              childMdx {
                tableOfContents
              }
            }
          }
        }
      }
    }
  }
`;

const DocsTemplate: React.FC<PageProps<GatsbyTypes.ComponentUsageQuery>> = ({
  data,
  path,
  children,
}) => {
  const { name, description, platform } = data.componentMetaJson!;
  const tableOfContents =
    platform?.docs?.usage?.mdx?.childMdx?.tableOfContents!;

  return (
    <>
      <article className={style.content}>
        <h1 className={style.title}>{name}</h1>
        <p className={style.titleDescription}>{description}</p>
        <ComponentDocumentCategoryNav currentPath={path} />
        <div>{children}</div>
        {/* <EditLink slug={path} /> */}
      </article>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  );
};

export const Head: HeadFC<GatsbyTypes.ComponentUsageQuery> = ({ data }) => {
  const { name, description } = data.componentMetaJson!;
  return <SEO name={`${name}`} description={`${description}`} />;
};

export default DocsTemplate;
