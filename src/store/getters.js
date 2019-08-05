const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  userId: state => state.user.userId,
  regionId: state => state.user.regionId,
  repositoryId: state => state.user.repositoryId,
  yin: state => state.app.yin,
  countryId: state => state.user.countryId,
  deptId: state => state.user.deptId,
  regionName: state => state.user.regionName,
  repositoryName: state => state.user.repositoryName,
  empcontract: state => state.publics.empcontract,
  empcontract2: state => state.publics.empcontract2,
  empcontract3: state => state.publics.empcontract3
}
export default getters
