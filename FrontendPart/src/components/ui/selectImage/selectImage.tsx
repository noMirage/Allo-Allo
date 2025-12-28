import "react-phone-input-2/lib/style.css";
import gStyles from "../../../styles/styles.module.scss";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { TPreviews } from "../../../interfaces/global";

interface IProps {
    previews: TPreviews[] | TPreviews;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
    className?: string;
    children: ReactNode;
    multipleMode?: boolean;
    placeholder?: string;
}

export function SelectImage(props: IProps) {
    const {
        setPreviews,
        setData,
        className = "",
        children,
        previews,
        multipleMode = true,
        placeholder = 'Натисність щоб завантажити фотографії'
    } = props;

    function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files) return;

        let data: TPreviews[] = Array.from(files).map((file) => {
            return { url: URL.createObjectURL(file), file };
        });

        setPreviews((prevState) => {
            if (Array.isArray(prevState)) {
                const newState = [...prevState, ...data];
                return newState;
            } else {
                const newState = {url: URL.createObjectURL(files[0]), file: files[0]};
                return newState;
            }
        });

        setData((prevState: any) => {
            const newState = { ...prevState };
            newState.images = previews;
            return newState;
        });
    }

    return (
        <>
            <div className={`${styles.containerInput} ${className}`}>
                {multipleMode ? (
                    <input
                        onChange={(event) => handleSelectImages(event)}
                        className={`${styles.hiddenInput}`}
                        multiple
                        accept="image/*"
                        type="file"
                        name="images[]"
                    />
                ) : (
                    <input
                        onChange={(event) => handleSelectImages(event)}
                        className={`${styles.hiddenInput}`}
                        accept="image/*"
                        type="file"
                        name="images[]"
                    />
                )}
                <input
                    placeholder={placeholder}
                    className={`${styles.input} ${gStyles.textExtraBig}`}
                    name="show"
                />
            </div>
            {children}
        </>
    );
}
