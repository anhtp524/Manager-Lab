import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Lazyloading from '~/common/components/lazyloading/Lazyloading'
import ErrorPage from '~/components/ErrorPage/ErrorPage'
import Layout from '~/components/Layout/Layout'
import Homepage from '~/pages/Homepage/Homepage'
import Labs from '~/pages/Labs/Labs'
import ProfileStudent from '~/pages/ProfileStudent/ProfileStudent'
import { Role, RoutePath } from './util'
import AuthenLayout from '~/components/Layout/AuthenLayout'
import Login from '~/pages/Authen/Login'
import ForgotPassword from '~/pages/Authen/ForgotPassword'
import ProtectedRoutes from './ProtectedRoutes'
import Chat from '~/pages/Chat/Chat'
import Project from '~/pages/Project/Project'
import ProjectChildren from '~/pages/Project/components/ProjectChildren'
import LabDetail from '~/pages/Labs/LabDetail'
import SignUp from '~/pages/Authen/SignUp'
import { ProjectProvider } from '~/pages/Project/project.context'
import { ChatBoxProvider } from '~/pages/Chat/chat.context'
import { LabProvider } from '~/pages/Labs/LabContext'
import { ProjectChildrenProvider } from '~/pages/Project/components/ProjectChildrenContext'
import Certificate from '~/pages/Project/components/Certificate'

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
        path: RoutePath.Project,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProjectProvider>
              <Project />
            </ProjectProvider>
          </Suspense>
        )
      },
      {
        path: RoutePath.ProjectDetails,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProjectChildrenProvider>
              <ProjectChildren />
            </ProjectChildrenProvider>
          </Suspense>
        )
      },
      {
        path: RoutePath.Chat,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ChatBoxProvider>
              <Chat />
            </ChatBoxProvider>
          </Suspense>
        )
      },
      {
        path: RoutePath.LabDetail,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <LabProvider>
              <LabDetail />
            </LabProvider>
          </Suspense>
        )
      },
      {
        path: RoutePath.ManagementAccount,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <ProtectedRoutes role={[Role.Teacher]}>
              <div>Management Account</div>
            </ProtectedRoutes>
          </Suspense>
        )
      },
      {
        path: RoutePath.TaskDetail + '/:id',
        element: (
          <Suspense fallback={<Lazyloading />}>
            <div>Hello</div>
          </Suspense>
        )
      },
      {
        path: RoutePath.Certificate,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <Certificate />
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
      },
      {
        path: RoutePath.SignUp,
        element: (
          <Suspense fallback={<Lazyloading />}>
            <SignUp />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Lazyloading />}>
        {/* <ProtectedRoutes> */}
        <ErrorPage />
        {/* </ProtectedRoutes> */}
      </Suspense>
    )
  }
])

export default router
