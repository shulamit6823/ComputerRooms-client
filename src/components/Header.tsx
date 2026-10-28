import { Box, Button } from "@mui/material";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import UseLogout from "../hooks/UseLogOut";
import Logo from "./logo";

const Header = () => {
    const logout = UseLogout();

    return (
        <Box
            component="header"
            dir="rtl"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 2, md: 4 },
                py: 1.5,
                background: 'linear-gradient(to left, #faf5fe, #f3fbfd)',
                borderBottom: '1px solid #ece8f3',
                boxShadow: '0 2px 10px rgba(120, 100, 160, 0.06)',
            }}
        >
            <Logo />

            <Button
                onClick={logout}
                variant="outlined"
                size="small"
                startIcon={<LogoutOutlinedIcon sx={{ fontSize: 18 }} />}
                sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    px: 2,
                    color: '#9b4dbf',
                    borderColor: '#e2c4f2',
                    bgcolor: '#ffffff',
                    '&:hover': {
                        borderColor: '#d77cf5',
                        bgcolor: '#fbf4fe',
                    },
                }}
            >
                התנתקות
            </Button>
        </Box>
    );
};

export default Header;