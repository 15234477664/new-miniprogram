//分页管理

let curPage = 1

const isHasNextPage = function (list, page, totalNum) {
  if (list.length < totalNum) {
    curPage++;
    return true
  }
  return false
}

const getPage = function () {
  return curPage
}

const initPage = function (cur) {
  curPage = 1
}

module.exports =  {
  isHasNextPage,
  getPage,
  initPage
}