import Api from '@/services/Api'

export default {
  index(params) {
    return Api().get(`bookmarks?songId=${params.songId}`)
  },
  show() {
    return Api().get(`bookmarks`)
  },
  post(bookmark) {
    return Api().post('bookmarks', bookmark)
  },
  delete(bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
