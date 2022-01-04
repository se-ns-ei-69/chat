import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    imagePreview: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5px',
        fontSize: '14px',
        border: '2px solid #cc486b',
        borderRadius: '3px',
        color: '#fefefe80'
    },
    uploadedImage: {
        width: 150,
        height: 150,
        objectFit: 'contain',
        marginBottom: '5px'
    },
    imageName: {
        padding: '5px'
    }
}))

const Image = ({ blob, fileName }) => {
    const [imageSrc, setImageSrc] = useState('')
    const classes = useStyles()

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            setImageSrc(reader.result)
        }
    }, [blob])

    return (
        <div className={classes.imagePreview}>
            <img className={classes.uploadedImage} src={imageSrc} alt={fileName} />
            <span className={classes.imageName}>{fileName}</span>
        </div>
    )
}

export default Image
