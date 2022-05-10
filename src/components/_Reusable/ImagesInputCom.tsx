import React, { SyntheticEvent, useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
import Image from "next/image";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { ImageType } from 'src/utils/TS/interface';
import ImageMetadataInputCom from "./ImageMetadataImputCom";
import LoadingLinealWithNumberCom from "./LoadingLinealWithNumberCom";
import ErrorTextCom from "./ErrorTextCom";

export default function ImagesInputCom({
    image,
    index,
    changeImage,
    editMetadata,
    loading,
    error,
    progress
}: {
    image: ImageType,
    index: number,
    changeImage: any,
    editMetadata: any,
    loading: boolean,
    error: string | boolean,
    progress: number


}
) {

    function handleChangePhoto(e: ChangeEvent<HTMLInputElement>, oldUrl: string, positionInArray: number): void {
        changeImage(image.url, positionInArray, e.target.files![0]);
    }
    return (
        <Grid container direction="column" spacing={2}>
            <input
                type="file"
                id={image.url}
                name="projectPhoto"
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                onChange={(e) => handleChangePhoto(e, image.url, index)}
                multiple
                disabled={loading}
            />
            <>
                <Grid item>
                    <label htmlFor={image.url}>
                        <Image src={image.url} alt={image.alt} width={300} height={300} />
                    </label>
                    <Box sx={{ height: 20 }}>
                        {loading && <LoadingLinealWithNumberCom progress={progress} />}
                        {error && <ErrorTextCom text={error} />}
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{ width: 300, }}>
                        {image && <ImageMetadataInputCom image={image} index={index} editMetadata={editMetadata} loading={loading} />}

                    </Box>
                </Grid>
            </>
        </Grid>

    );
}
