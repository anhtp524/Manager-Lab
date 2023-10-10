import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Lazyloading from '~/common/components/lazyloading/Lazyloading'
import ErrorPage from '~/components/ErrorPage/ErrorPage'
import Layout from '~/components/Layout/Layout'
import Homepage from '~/pages/Homepage/Homepage'
import LabDetail from '~/pages/Labs/LabDetail'
import Labs from '~/pages/Labs/Labs'
import ManagementProduct from '~/pages/ManagementProduct/ManagementProduct'
import ManagementStudent from '~/pages/ManagementStudent/ManagementStudent'
import Personalinfo from '~/pages/PersonalInfo/Personalinfo'
import ProfileLecture from '~/pages/ProfileLecture/ProfileLecture'
import ProfileStudent from '~/pages/ProfileStudent/ProfileStudent'
import { RoutePath } from './util'
import Login from '~/pages/Login/Login'

const router = createBrowserRouter([
  {
    path: RoutePath.HomePage,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Homepage />
          </Suspense>
        )
      },
      {
        path: RoutePath.Labs,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Labs />
          </Suspense>
        )
      },
      {
        path: RoutePath.ContestSprizes,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProfileStudent />
          </Suspense>
        )
      },
      {
        path: RoutePath.Newfeed,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ManagementProduct />
          </Suspense>
        )
      },
      {
        path: RoutePath.Project,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ManagementStudent />
          </Suspense>
        )
      },
      {
        path: RoutePath.Newfeed,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Personalinfo />
          </Suspense>
        )
      },
      {
        path: RoutePath.Chat,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProfileLecture />
          </Suspense>
        )
      },
      {
        path: RoutePath.LabDetail,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <LabDetail />
          </Suspense>
        )
      }
    ]
  },
  {
    path: RoutePath.Login,
    element: (
      <Suspense fallback={<Lazyloading />}>
        <Login />
      </Suspense>
    )
  }
])

export default router
