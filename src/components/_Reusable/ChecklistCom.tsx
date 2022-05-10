import React, { useState, SyntheticEvent, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Box from "@mui/material/Box";


export default function ChecklistCom({
    handleChange,
    name,
    items,
    text
}: {
    handleChange: any;
    name: string;
    text: string;
    items: string[];
}) {
    const [switched, setSwitched] = useState<string[]>([]);

    useEffect(() => { handleChange(name, switched) }, [switched]);

    function onChange(e: SyntheticEvent): void {
        const target = (e.target as HTMLInputElement).value;
        if (!switched.includes(target)) {
            setSwitched([...switched, target])
        } else {
            setSwitched(switched.filter((item) => item !== target))
        }

    }
    return (

        <Box sx={{ height: 510 }}>
            <List
                sx={{ width: '300px', bgcolor: 'background.paper' }}
                subheader={<ListSubheader>{text}</ListSubheader>}
                onChange={onChange}
            >
                {items.map((item, i) => (
                    <ListItem key={text + i} >
                        <ListItemText id={`switch-list-label-${item}`} primary={item} />
                        <Switch
                            edge="end"
                            value={item}
                        />
                    </ListItem>
                ))
                }
            </List >
        </Box>


    );
}
