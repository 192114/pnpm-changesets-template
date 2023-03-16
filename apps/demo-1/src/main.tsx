import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from '~/App'
import { routes } from '~/routes'
import 'sanitize.css'
import '~/styles/index.css'

const router = createHashRouter([
  {
    path: '',
    element: <App />,
    errorElement: <div>error</div>,
    children: routes,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
