import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './config/router.jsx'
import { ContextProvider } from './config/ContextProvider.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TestAuthRoute from './config/TestAuthRoute.jsx'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* <TestAuthRoute/> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
    </ContextProvider>
  </React.StrictMode>,
)