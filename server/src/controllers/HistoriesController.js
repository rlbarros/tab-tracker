const { History, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      // const userId = req.query.userId
      const userId = req.user.id

      const where = {
        UserId: userId
      }

      const histories = await History.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history =>
          _.extend(
            {
              historyId: history.id,
              timeCreated: history.createdAt
            },
            history.Song
          )
        )

      res.send(_.uniqBy(histories, history => history.id))
      // res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the History.'
      })
    }
  },
  async post(req, res) {
    try {
      const { songId } = req.body
      //  const { songId, userId } = req.body
      const userId = req.user.id
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })

      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to create the History.'
      })
    }
  }
}
