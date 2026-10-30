import { createTheme } from "@mui/material/styles";

// עיצוב אחיד של רכיבי MUI בכל הפרויקט, בצבעי האתר
const theme = createTheme({
    components: {
        // הודעות Alert: פינות מעוגלות, מסגרת עדינה וצבעים רכים
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: "1px solid",
                    alignItems: "center",
                    fontSize: 14.5,
                    fontWeight: 500,
                    boxShadow: "0 2px 10px rgba(31, 35, 64, 0.05)",
                    "& .MuiAlert-icon": { color: "inherit", opacity: 0.9 },
                },
            },
            // צבעים לפי סוג ההודעה
            variants: [
                { props: { severity: "error" }, style: { backgroundColor: "#fdf0f2", color: "#b4233a", borderColor: "#f6c9d1" } },
                { props: { severity: "success" }, style: { backgroundColor: "#ebf8f1", color: "#1e7b4c", borderColor: "#c3e9d4" } },
                { props: { severity: "info" }, style: { backgroundColor: "#f6effb", color: "#7b3f99", borderColor: "#e2c4f2" } },
                { props: { severity: "warning" }, style: { backgroundColor: "#fff7e8", color: "#a35f00", borderColor: "#ffe1ad" } },
            ],
        },
        // גלגלת טעינה בסגול של האתר
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: { color: "#ba68c8" },
            },
        },
    },
});

export default theme;
