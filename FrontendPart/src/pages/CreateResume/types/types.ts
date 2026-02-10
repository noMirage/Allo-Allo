import { TCategoryWorks } from "../../../interfaces/works";

export type TUserDataWResume = {
  category: TCategoryWorks;
  title: string;
  description: string;
  images: FileList | string[];
  [key: string]: TCategoryWorks | string | FileList | string[];
};
