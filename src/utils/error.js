function errorNotify (obj) {
  obj.$notify({
    title: '错误',
    message: '请求失败，请检查网络链接',
    type: 'error'
  })
}

function errorNotifyByResponse (obj, resp) {
  obj.$notify({
    title: '错误',
    message: resp.body.msg,
    type: 'error'
  })
}

export {
  errorNotify,
  errorNotifyByResponse
}
