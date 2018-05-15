import AV from "leancloud-storage"

var APP_ID = 'rfzS1wpukEnBxfSejz9z484m-gzGzoHsz';
var APP_KEY = 'WQAEHxs74JVV5Wq9Wmdpfqsi';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel = {
  getByUser(user, successFn, errorFn){
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((t) => {
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },  
  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
    // 这样做就可以让这个 Todo 只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)

    todo.setACL(acl);

    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });

  },
  update() {

  },
  destroy() {

  }
}

export function signUp(email, username, password, successFn, errorFn) {
  var user = new AV.User()
  user.setEmail(email)
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn(error)
  })
  return undefined
}
export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then((loginedUser) => {
    let user = getUserFromAVUser(loginedUser)
    successFn(user)
  }, (error) => {
    errorFn(error)
  })
}
export function signOut() {
  AV.User.logOut()
  return undefined
}
export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn()
  }, function (error) {
    errorFn(error)
  })
}
export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}