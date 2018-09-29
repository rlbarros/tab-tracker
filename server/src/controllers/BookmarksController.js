const { Bookmark, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const songId = req.query.songId
      // const userId = req.query.userId
      const userId = req.user.id

      const where = {
        UserId: userId
      }

      if (songId) {
        where.SongId = songId
      }

      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark =>
          _.extend(
            {
              bookmarkId: bookmark.id
            },
            bookmark.Song
          )
        )

      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the bookmark.'
      })
    }
  },
  async post(req, res) {
    try {
      // const { songId, userId } = req.body
      const { songId } = req.body
      const userId = req.user.id
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })

      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as bookmark'
        })
      }

      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to create the bookmark.'
      })
    }
  },
  async delete(req, res) {
    try {
      const { bookmarkId } = req.params
      const userId = req.user.id
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to delete the bookmark.'
      })
    }
  }
}
