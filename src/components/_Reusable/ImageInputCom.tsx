import React, { useState, SyntheticEvent, ChangeEvent, ChangeEventHandler } from "react";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
//Components
import ErrorTextCom from "./ErrorTextCom";
//Types
import { ImageType } from '../../utils/TS/interface';
//Utils
import LoadingLinealWithNumberCom from "./LoadingLinealWithNumberCom";
import ImageMetadataInputCom from "./ImageMetadataImputCom";


export default function ImageInputCom({
    handleChangePhoto,
    editMetadataOne,
    image,
    loading,
    error,
    progress
}: {
    handleChangePhoto: ChangeEventHandler<HTMLInputElement>,
    editMetadataOne: any,
    image: ImageType,
    loading: boolean,
    error: string | boolean,
    progress: number
}) {

    return (

        <Grid container direction="column" spacing={2} >
            <input
                type="file"
                id="photo-upload"
                name="projectPhoto"
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                onChange={handleChangePhoto}
                multiple
                disabled={loading}
            />

            <Grid item>
                <label htmlFor="photo-upload">
                    {!image && <Skeleton variant="rectangular" animation="wave" width={300} height={300} />}
                    {image && <Image src={image.url} alt={image.title} width={300} height={300} />}
                </label>
                <Box sx={{ height: 20 }}>
                    {loading && <LoadingLinealWithNumberCom progress={progress} />}
                    {error && <ErrorTextCom text={error} />}
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{ width: 300, }}>
                    {!loading && <ImageMetadataInputCom image={image} editMetadata={editMetadataOne} loading={loading} index={0} />}
                </Box>

            </Grid>
        </Grid>

    )
}
/*
 
 */
