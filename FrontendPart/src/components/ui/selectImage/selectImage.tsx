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
    error: string | null;
}

export function SelectImage(props: IProps) {
    const {
        setPreviews,
        setData,
        className = "",
        children,
        previews,
        multipleMode = true,
        placeholder = 'Натисність щоб завантажити фотографії',
        error = null,
    } = props;

    function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>, multiple: boolean) {
        const files = event.target.files;
        if (!files) return;

        let data: TPreviews[] = Array.from(files).map((file) => {
            return { url: URL.createObjectURL(file), file };
        });

        setPreviews((prevState) => {
            if (Array.isArray(prevState)) {
                if (multiple) {
                    const newState = [...prevState, ...data];
                    return newState;
                } else {
                    const newState = [...data];
                    return newState;
                }
            } else {
                return prevState;
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
                        onChange={(event) => handleSelectImages(event, true)}
                        className={`${styles.hiddenInput} ${error && gStyles.inputWrong}`}
                        multiple
                        accept="image/*"
                        type="file"
                        name="images[]"
                    />
                ) : (
                    <input
                        onChange={(event) => handleSelectImages(event, false)}
                        className={`${styles.hiddenInput}`}
                        accept="image/*"
                        type="file"
                        name="images[]"
                    />
                )}
                <input
                    placeholder={placeholder}
                    className={`${styles.input} ${gStyles.textExtraBig} ${error && gStyles.inputWrong}`}
                    name="show"
                />
            </div>
            {children}
        </>
    );
}
