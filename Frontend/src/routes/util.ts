export enum RoutePath {
  HomePage = '/',
  ContestSprizes = '/contestsprizes',
  Project = '/project',
  ProjectDetails = '/project/details/:id',
  Newfeed = '/newfeed',
  Chat = '/chat',
  Auth = '/auth',
  Login = '/auth/login',
  SignUp = '/auth/signup',
  Forgotpass = '/auth/forgotpass',
  NotFoundPage = '/notfoundpage',
  ProfileLecture = '/profile/lecture',
  ProfileStudent = '/profile/student',
  Labs = '/labs',
  LabDetail = '/labsdetail/:id',
  ManagementStudent = '/studentmanagement',
  ManagementProduct = '/productmanagement',
  Personalinfo = '/personalinfo',
  ManagementAccount = '/account',
  TaskDetail = '/project/details',
  Certificate = 'certificate'
}

export enum ProjectStatus {
  UnConfirm = 0,
  New = 100,
  OnGoing = 101,
  Finish = 102,
  Cancel = 103
}

export enum Role {
  Admin = 0,
  Student = 1,
  Teacher = 2
}
