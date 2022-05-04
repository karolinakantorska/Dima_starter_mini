import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { phaseArray, regionenArray, Phase, Regionen } from '../../utils/TS/interface';
// @mui
import { Grid, Typography } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

// Icons
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// _mock_
import { _mockProjekts } from '../../_mock/referenzen/referenzen';

interface Props {
    sorted: boolean,
    inputs: any,
    handleInputChange: (e: SyntheticEvent<Element, Event>) => void,
}
export function FilterReferenzenCom({ sorted, inputs, handleInputChange, }: Props) {
    const phase = phaseArray.slice(0, -1);
    const regions = regionenArray.slice(0, -1);
    const MyRadio = ({ text }: { text: Phase | Regionen }) => (
        <FormControlLabel
            value={text}
            control={<Radio
                icon={<CropSquareRoundedIcon sx={{ height: 12 }} />}
                checkedIcon={<SquareRoundedIcon sx={{ height: 12 }} />}
            />}
            label={
                <Typography
                    variant="overline"
                    component="span"
                    color={
                        text === inputs.param
                            ? 'dima'
                            : 'text.secondary'
                    }
                    sx={{
                        ml: -1.1,
                        lineHeight: 4
                    }}
                >
                    {text}
                </Typography>
            }
        />)
    const MyRadioReset = () => (
        <FormControlLabel
            value={'Alle'}
            control={<Radio
                icon={<CloseRoundedIcon />}
                checkedIcon={<CloseRoundedIcon />}
            />}
            label={false}
        />)
    return (
        <Grid container direction="row" justifyContent="center" sx={{ mt: 0 }}>
            <Grid item>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={false}
                    onChange={handleInputChange}
                    name="param"
                    sx={{ maxWidth: 450, pl: 1.27, pr: 1.27 }}
                >
                    <Grid container direction="row" justifyContent="space-between" >
                        {phase.map((ph) => <MyRadio text={ph} key={ph} />)}
                        {sorted && <MyRadioReset />}
                    </Grid>
                    <Grid container direction="row" justifyContent="space-between">
                        {regions.map((region) => <MyRadio text={region} key={region} />)}
                    </Grid>
                </RadioGroup>
            </Grid >
        </Grid >
    );
}
