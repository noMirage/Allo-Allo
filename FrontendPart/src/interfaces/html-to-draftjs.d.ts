declare module "html-to-draftjs" {
  import { ContentBlock, DraftEntityMap } from "draft-js";

  interface BlocksFromHtml {
    contentBlocks: ContentBlock[];
    entityMap: DraftEntityMap;
  }

  function htmlToDraft(html: string): BlocksFromHtml;

  export default htmlToDraft;
}
