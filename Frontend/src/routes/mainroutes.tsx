import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Lazyloading from '~/common/components/lazyloading/Lazyloading'
import ErrorPage from '~/components/ErrorPage/ErrorPage'
import Layout from '~/components/Layout/Layout'
import Homepage from '~/pages/Homepage/Homepage'
import LabDetail from '~/pages/Labs/LabDetail'
import Labs from '~/pages/Labs/Labs'
import ProfileStudent from '~/pages/ProfileStudent/ProfileStudent'
import { RoutePath } from './util'
import AuthenLayout from '~/components/Layout/AuthenLayout'
import Login from '~/pages/Authen/Login'
import ForgotPassword from '~/pages/Authen/ForgotPassword'
import ProtectedRoutes from './ProtectedRoutes'
import Chat from '~/pages/Chat/Chat'
import Forum from '~/pages/Forum/Forum'
import Project from '~/pages/Project/Project'
import ProjectChildren from '~/pages/Project/components/ProjectChildren'

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
            {/* <ManagementProduct /> */}
            <Forum />
          </Suspense>
        )
      },
      {
        path: RoutePath.Project,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Project />
          </Suspense>
        )
      },
      {
        path: RoutePath.ProjectDetails,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProjectChildren />
          </Suspense>
        )
      },
      {
        path: RoutePath.Chat,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Chat />
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
    path: RoutePath.Auth,
    element: <AuthenLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePath.Login,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: RoutePath.Forgotpass,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ForgotPassword />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Lazyloading />}>
        <ProtectedRoutes>
          <ErrorPage />
        </ProtectedRoutes>
      </Suspense>
    )
  }
])

export default router
