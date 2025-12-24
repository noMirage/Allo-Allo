import { TCategoryWorks } from "../../../constants/works"

export type TUserDataWResume = {
    category: TCategoryWorks;
    title: string;
    descritpion: string;
    images: string;
    [key: string]: TCategoryWorks | string;
}