export enum RoutePath {
  HomePage = '/',
  ContestSprizes = '/contestsprizes',
  Project = '/project',
  ProjectDetails = '/project/details/:id',
  Newfeed = '/newfeed',
  Chat = '/chat',
  Auth = '/auth',
  Login = '/auth/login',
  Forgotpass = '/auth/forgotpass',
  NotFoundPage = '/notfoundpage',
  ProfileLecture = '/profile/lecture',
  ProfileStudent = '/profile/student',
  Labs = '/labs',
  LabDetail = '/labsdetail/:id',
  ManagementStudent = '/studentmanagement',
  ManagementProduct = '/productmanagement',
  Personalinfo = '/personalinfo'
}

export enum ProjectStatus {
  Draft = 0,
  New = 100,
  OnGoing = 101,
  Finish = 102,
  Cancel = 103
}
