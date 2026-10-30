import { useState } from "react";
import { Alert, CircularProgress, MenuItem, Paper, TextField } from "@mui/material";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import { UseRequestTypes } from "../hooks/UseRequestTypes";

const selectSx = {
    minWidth: 170,
    "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#ffffff", fontSize: 14 },
};

const subSelectSx = {
    ...selectSx,
    "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fbf6fe", fontSize: 14, color: "#7b3f99" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2c4f2" },
};

const iconSx = { fontSize: 18, color: "#9aa5b4", marginInlineEnd: 0.5 };

const filterOptions = [
    "ללא סינון",
    "סטטוס",
    "סוג פנייה",
];

const sortOptions = [
    "ללא מיון",
    "תאריך יצירה",
    "תאריך יעד",
];
const statusOptions = [
    "ממתינה לטיפול",
    "בטיפול",
    "הסתיימה"
];
type RequestFiltersProps = {
    onFilter: (type: string, value: string) => void,
    onSort: (value: string) => void,
    disabled: boolean
}
const RequestFilters = ({ onFilter, onSort, disabled }: RequestFiltersProps) => {
    const [filterBy, setFilterBy] = useState("ללא סינון");
    const { data, isError, isPending, error } = UseRequestTypes()
 
    if (isError) {
        return <Alert severity="error" sx={{ mb: 3 }}>{error.message}</Alert>
    }
    if (isPending)
        return <CircularProgress size={24} sx={{ color: "#ba68c8", mb: 3 }} />
    return (<Paper
        variant="outlined"
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            mb: 3,
            borderRadius: 3,
            borderColor: '#e3e7ed',
            bgcolor: '#ffffff',
            width: 'fit-content',
            maxWidth: '100%',
            boxShadow: '0 2px 10px rgba(31, 35, 64, 0.04)',
        }}
    >
        <TextField
            select
            size="small"
            label="סינון"
            defaultValue={filterOptions[0]}
            disabled={disabled}
            sx={{ ...selectSx, order: 1 }}
            slotProps={{ input: { startAdornment: <FilterListRoundedIcon sx={iconSx} /> } }}
            onChange={(e) => {
                setFilterBy(e.target.value)
                if (e.target.value === "סטטוס") {
                    onFilter("סטטוס", statusOptions[0]);
                } else if (e.target.value  === "סוג פנייה") {
                    onFilter("סוג פנייה", data?.[0] ?? "");
                } else {
                    onFilter("", "");
                }
            }
            }
        >{filterOptions.map((f) =>
            <MenuItem key={f} value={f}>{f}</MenuItem>
        )}
        </TextField>

        <TextField
            select
            size="small"
            label="מיון"
            defaultValue={sortOptions[0]}
            disabled={disabled}
            sx={{ ...selectSx, order: 3 }}
            slotProps={{ input: { startAdornment: <SwapVertRoundedIcon sx={iconSx} /> } }}
            onChange={(e) => {
                onSort(e.target.value)
            }
            }
        >{sortOptions.map((f) =>
            <MenuItem key={f} value={f}>{f}</MenuItem>
        )}
        </TextField>
        {filterBy === "סטטוס" &&
            <TextField
                select
                size="small"
                label="בחירת סטטוס"
                defaultValue={statusOptions[0]}
                disabled={disabled}
                sx={{ ...subSelectSx, order: 2 }}
                onChange={(e) => {
                    onFilter("סטטוס", e.target.value)
                }
                }
            >{statusOptions.map((f) =>
                <MenuItem key={f} value={f}>{f}</MenuItem>
            )}
            </TextField>
        }
        {filterBy === "סוג פנייה" && (
            <TextField
                select
                size="small"
                label="בחירת סוג פנייה"
                defaultValue={data?.[0] ?? ""}
                disabled={disabled}
                sx={{ ...subSelectSx, order: 2 }}
                onChange={(e) => {
                    onFilter("סוג פנייה", e.target.value)
                }}
            >
                {data?.map((f) =>
                    <MenuItem key={f} value={f}>{f}</MenuItem>
                )}
            </TextField>)

        }
    </Paper>
    )
}
export default RequestFilters