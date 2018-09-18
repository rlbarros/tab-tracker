import Api from '@/services/Api'

export default {
  index(params) {
    console.log('params', params)
    return Api().get(`bookmarks?songId=${params.songId}&userId=${params.userId}`)
  },
  post(bookmark) {
    return Api().post('bookmarks', bookmark)
  },
  delete(bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
