import "../styles/global.css";
// _app.js는 global css를 적용시키기 위해 작성하는 것이다.
// global.css는 다른 파일에는 적용시킬 수 없다. 무조건 _app.js에서만 적용되어야만 하는
// nextjs 의 규칙!

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
