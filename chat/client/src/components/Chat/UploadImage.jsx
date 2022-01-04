import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dragWrapper: {
        position: 'absolute'
    },
    uploadImageZone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        margin: '0 auto',
        background: '#131314',
        border: '2px solid #cc486b',
        borderRadius: '5px',
        color: '#fefefe80',
        textAlign: 'center',
        maxWidth: '50%',
        position: 'relative',
        height: '50%'
    },
    uploadImageZoneActive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        margin: '0 auto',
        background: '#131314',
        border: '2px solid #fefefe80',
        borderRadius: '5px',
        color: '#cc486b',
        textAlign: 'center',
        maxWidth: '50%',
        position: 'relative',
        height: '50%'
    },
    textBlock: {
        width: '100%',
        padding:'20px 0'
    },
    absoluteBlock: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
    }
}));



const UploadImage = ({open}) => {
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const classes = useStyles();


    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    // const handleAttach = () => {
    //     setOpen(!open)
    // }

    return (
        <ImageUploading
        className={classes.dragWrapper}
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                <div>
                    {/* <Button variant="outlined" color="primary" onClick={handleAttach}> Attach</Button> */}
                    { open ?
                            <div
                                className={
                                    isDragging
                                    ?
                                    classes.uploadImageZoneActive
                                    : 
                                    classes.uploadImageZone}
                            onMouseDown={onImageUpload}
                            {...dragProps}
                            >
                                <div className={classes.textBlock}>
                                    <h1>Click or drop images here</h1>
                                    <p className={classes.dragZoneText}>to send them in a quick way</p>
                                </div>
                                <div className={classes.absoluteBlock}></div>
                            </div> : null}
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    );
}

export default UploadImage