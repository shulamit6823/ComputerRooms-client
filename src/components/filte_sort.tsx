import { useState, type CSSProperties } from "react";
import type { RequestCard } from "../types/RequestCard";
import { GetRequestTypesApi } from "../api/getRequestTypesApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const arrowIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a94a6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

const wrapStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    background: '#fafbfc',
    border: '1px solid #e3e7ed',
    borderRadius: 12,
    width: 'fit-content',
    maxWidth: '100%',
    marginBottom: 24,
    direction: 'rtl',
};

const selectStyle: CSSProperties = {
    appearance: 'none',
    WebkitAppearance: 'none',
    minWidth: 150,
    height: 38,
    padding: '0 14px 0 36px',
    fontSize: 14,
    fontFamily: 'inherit',
    color: '#3d4654',
    backgroundColor: '#ffffff',
    backgroundImage: arrowIcon,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left 12px center',
    border: '1px solid #d5dae2',
    borderRadius: 10,
    cursor: 'pointer',
    outline: 'none',
};

const subSelectStyle: CSSProperties = {
    ...selectStyle,
    backgroundColor: '#f6f0fb',
    borderColor: '#e2c4f2',
    color: '#7b3f99',
};

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
    requests: RequestCard[],
    onFilter: (value: string, type: string) => void,
    onSort: (value: string) => void
}
const RequestFilters = ({ onFilter, onSort }: RequestFiltersProps) => {
    const [filterBy, setFilterBy] = useState("ללא סינון");
    const { data, isError, isPending, error } = useQuery<string[]>({
        queryKey: ["requestTypes"],
        queryFn: GetRequestTypesApi
    });
    // if(isError){
    //     return <p>{error}</p>
    //}
    if (isPending)
        return <p>טוען...</p>
    return (<div style={wrapStyle}>
        <select
            aria-label="סינון"
            style={{ ...selectStyle, order: 1 }}
            onChange={(e) => {
                setFilterBy(e.target.value)
                if (e.target.value !== "סטטוס") {
                    onFilter(e.target.value, "");
                }
            }
            }
        >{filterOptions.map((f) =>
            <option key={f}>{f}</option>
        )}
        </select>

        <select
            aria-label="מיון"
            style={{ ...selectStyle, order: 3 }}
            onChange={(e) => {
                onSort(e.target.value)
            }
            }
        >{sortOptions.map((f) =>
            <option key={f}>{f}</option>
        )}
        </select>
        {filterBy === "סטטוס" &&
            <select
                aria-label="בחירת סטטוס"
                style={{ ...subSelectStyle, order: 2 }}
                onChange={(e) => {
                    onFilter("סטטוס", e.target.value)
                }
                }
            >{statusOptions.map((f) =>
                <option key={f}>{f}</option>
            )}
            </select >
        }
        {filterBy === "סוג פנייה" && (
            <select
                aria-label="בחירת סוג פנייה"
                style={{ ...subSelectStyle, order: 2 }}
                onChange={(e) => {
                    onFilter("סוג פנייה", e.target.value)
                }}
            >
                {data?.map((f) =>
                    <option key={f}>{f}</option>
                )}
            </select>)

        }
    </div>
    )
}
export default RequestFilters