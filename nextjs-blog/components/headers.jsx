import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import qro from "../public/images/profile.jpg";
import Image from "next/image";
import Link from "next/link";
const name = "qro hiphop";
export const siteTitle = "Next.js Sample webSite";
export default function header({ home }) {
  return (
    <header className={styles.header}>
      {home ? (
        <>
          <Image
            priority
            src={qro}
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={name}
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src={qro}
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
