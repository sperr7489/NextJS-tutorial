import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
//이때 여기서 process.cwd는 현재 작업하고 있는 공간이 아닌 node command를 불러오는 위치이므로 next-blog가 된다.
//따라서 postsDirectory는 nextjs-blog/posts 디렉토리가 된다.

export function getSortedPostsData() {
  //get file names under /posts

  const fileNames = fs.readdirSync(postsDirectory);
  console.log(fileNames, "이것이 file이름이다. 배열로 나오겠지?");
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    //.md 확장자를 ""으로 바꾸어서 id에 파일 이름만 저장하도록 한다.

    // const obj = getPostData(id).then();

    // return obj;

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    console.log(matterResult, "matterResult의 형식을확인하기 위한 콘솔");
    //json 형식인것.

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    //위에 mattterResult.data에서 반환된 값이 date와 title 일텐데, 그것을
    //구조분해할 당할 때 각각 a와 b라는 변수로 재정의하는 방식이다.
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileName = fs.readdirSync(postsDirectory);

  return fileName.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  //promise가 성공적으로 반환 => resolve, 그에따라 다음 추가 과정을 작성 가능하다.
  console.log(processedContent, "processedContent의 생김새를 확인하자 ");
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
    //metaData를 가지고 있다.
  };
}
