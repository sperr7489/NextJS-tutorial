import Head from "next/head";
import QroHeader from "./headers";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
const name = "qro hiphop";
export const siteTitle = "Next.js Sample webSite";
export default function Layout({ children, home }) {
  //<Layout home> 이부분을 children이라고 할 수 있다.</Layout> 태그 옆에 "home"이라고 써놓은 props를 home인자라고 칭함!

  console.log(children, "이것이 children");
  console.log(home, "이것이 home이다.true값?");
  return (
    <div className={styles.container}>
      {/* {이름}.module.css로  classname을 지정하면 고유한 classname을 작성할 수 있다.*/}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <QroHeader></QroHeader>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
