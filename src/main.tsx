import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  routes  from  "./routes/AppRoutes.tsx"
import UserProvider from './context/UserProvider.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';



const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <UserProvider>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes}/>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
  </UserProvider>
)
