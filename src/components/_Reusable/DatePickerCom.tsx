import React, { SyntheticEvent, useState, useEffect } from "react";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "@mui/material/TextField";

export default function DatePickerCom({ name, handleDate }: { name: string, handleDate: any }) {
    //const [date, setDate] = useState<Date | null>(new Date());
    const [date, setDate] = useState<Date | null>(null);
    useEffect(() => { handleDate(name, date && date.getFullYear()) }, [date]);
    function onChange(e: Date | null) {
        setDate(e)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                views={['year']}
                label="Baujahr"
                value={date}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </LocalizationProvider>
    );
}