<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}
        </div>

        <v-btn dark class="cyan" :to="`/songs/${song.id}/edit`">
          Edit Song
        </v-btn>

        <v-btn dark class="cyan" @click="Bookmark" v-if="isUserLoggedIn && !bookmark">
          Set As Bookmark
        </v-btn>

        <v-btn dark class="cyan" @click="UnBookmark" v-if="isUserLoggedIn && !!bookmark">
          Unset As Bookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImage" />
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: ['song'],
  data() {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn'])
  },
  watch: {
    async song() {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const SongId = this.song.id
        const UserId = this.$store.state.user.id

        console.log('SongID: ', SongId)
        console.log('UserID: ', UserId)

        this.bookmark = (await BookmarksService.index({
          songId: SongId,
          userId: UserId
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async Bookmark() {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async UnBookmark() {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 40%;
  margin: 0 auto;
}
</style>
