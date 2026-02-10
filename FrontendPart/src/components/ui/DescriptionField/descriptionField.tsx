import styles from './styles.module.scss';
import gStyles from '../../../styles/styles.module.scss';
import { Field } from 'formik';
import { validateDescription } from '../../../utils/js/validates';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from "html-to-draftjs";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IProps {
    error?: string | undefined;
    description?: string;
}

export function DescriptionField(props: IProps) {
    const { error, description } = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    function handleChangeDescription(state: EditorState, form: any) {
        setEditorState(state);
        const html = draftToHtml(convertToRaw(state.getCurrentContent()));
        form.setFieldValue("description", html);
    }

    useEffect(() => {
        if (description) {
            const blocksFromHtml = htmlToDraft(description);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, []);

    return (
        <Field name="description" validate={() => validateDescription(editorState)}>
            {({ field, meta, form }: any) => (
                <>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={(state) => {
                            handleChangeDescription(state, form);
                            form.setFieldValue("description", draftToHtml(convertToRaw(state.getCurrentContent())));
                        }}

                        onBlur={() => form.setFieldTouched("description", true)} onFocus={() => { }}
                        toolbarClassName={styles.toolBar}
                        wrapperClassName="wrapperClassName"
                        placeholder='Опис вашого резюме'
                        editorClassName={`${styles.input} ${styles.description} ${error && gStyles.inputWrong}`}
                    />
                </>
            )}
        </Field>
    );
}