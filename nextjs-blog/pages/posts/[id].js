import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
//Post 컴포넌트는 게시글을 미리 가져와야하므로 pre-rendering을 통해서
//data fetch를 미리 진행한 것이다.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  //paths에는 {params: {id :value} }가 들어간다.
  return {
    paths,
    fallback: false,
  };
}
//pre-render 로 인해 data fetch된 paths의 params를 인자로 받을 수 있다.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  //async함수를 사용하기 위해서는 비동기처리를 하기 위해 await을 써주어야만한다.

  //postData에는 id로 지정된 파일이름과 date,title로 구성된 data가 객체로 구성됨.
  return {
    props: {
      postData,
    },
  };
}
