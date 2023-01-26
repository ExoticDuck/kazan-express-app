import { DragEvent, useState } from 'react';
import style from './FileUploader.module.css';
import { useAppDispatch } from './../../../store/hooks';
import { DownloadFileTC, UploadFileTC } from '../../../store/reducers/PurchasesReducer';
import FileSaver from 'file-saver';



type FileUploaderPropsType = {
    token: string | null;
}

function FileUploader(props: FileUploaderPropsType) {
    const [drag, setDrag] = useState(false);
    let dispatch = useAppDispatch();

    function dragStartHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        setDrag(false);
    }

    function onDropHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        //@ts-ignore
        let file = [e.dataTransfer.files[0]];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file[0]);
        console.log(formData.get("file"));
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(UploadFileTC(props.token, formData));
        }
        setDrag(false);
    }

    function onDownloadHandler() {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(DownloadFileTC(props.token))
        }

        // FileSaver.saveAs(process.env.REACT_APP_CLIENT_URL + '/resource/purchases.xlsx', "purchases.xlsx");
    }

    return (
        <div className={style.Container}>
            {drag ?
                <div className={style.DropArea}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >Отпустите файл .xlsx</div>
                :
                <div className={style.DragArea}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >Перетащите файл .xlsx</div>
            }
            <div className={style.LinkBox}><a onClick={() => onDownloadHandler()} >Скачать шаблон</a></div>
        </div>
    )
}

export default FileUploader