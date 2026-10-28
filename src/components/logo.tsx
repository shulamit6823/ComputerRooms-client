import { Box, Typography } from '@mui/material';

const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
            sx={{
                width: 56,
                height: 56,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #d77cf5, #67e3f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(199, 125, 255, 0.45)',
                flexShrink: 0,
            }}
        >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#1a1530" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M12 16v4M8 20h8" />
                <path d="M7 8h5M7 11h3" />
                <circle cx="16.5" cy="9.5" r="1.4" fill="#1a1530" stroke="none" />
            </svg>
        </Box>

        <Box>
            <Typography
                sx={{
                    fontWeight: 800,
                    fontSize: 25,
                    lineHeight: 1.15,
                    background: 'linear-gradient(to left, #d77cf5, #67e3f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                חדרי מחשבים
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: '#9aa5c4' }}>
                מדווחים. מטפלים. פותרים.
            </Typography>
        </Box>
    </Box>
);

export default Logo;