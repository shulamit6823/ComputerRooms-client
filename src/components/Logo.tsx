import { Box, Typography } from '@mui/material';

const Logo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* סמל: מסך עם וי (תקלה שנפתרה) ותג מפתח ברגים (מטפלים בה) */}
        <Box sx={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
            <Box
                sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #67e3f0 0%, #9fa8da 50%, #c77dff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 18px rgba(155, 77, 191, 0.35)',
                }}
            >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                    stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2.5" y="3.5" width="19" height="13" rx="2.5" />
                    <path d="M9 20.5h6M12 16.5v4" />
                    <path d="M8 10.2l2.6 2.6L16 7.4" strokeWidth="2.4" />
                </svg>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: -5,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#ffffff',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 6px rgba(26, 21, 48, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#9b4dbf" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            </Box>
        </Box>

        <Box>
            <Typography
                dir="ltr"
                sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: 28,
                    lineHeight: 1.1,
                    letterSpacing: '-0.5px',
                    color: '#1f2340',
                    textAlign: 'right',
                }}
            >
                Fix
                <Box
                    component="span"
                    sx={{
                        background: 'linear-gradient(to right, #4dd0e1, #c77dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    It
                </Box>
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: '#9aa5c4' }}>
                מדווחים. מטפלים. פותרים.
            </Typography>
        </Box>
    </Box>
);

export default Logo;
