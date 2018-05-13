import AV from "leancloud-storage"

var APP_ID = 'rfzS1wpukEnBxfSejz9z484m-gzGzoHsz';
var APP_KEY = 'WQAEHxs74JVV5Wq9Wmdpfqsi';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function(loginedUser){
    let user  = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn(error)
  })
  return undefined
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

function getUserFromAVUser(AVUser){
  return {
    id:AVUser.id,
    ...AVUser.attributes
  }
}