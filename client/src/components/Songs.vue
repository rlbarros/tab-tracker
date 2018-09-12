<template>
  <v-layout align-center justify-center column>
     <v-flex xs6>
      <panel title="Songs">
        <v-btn slot="action" class="cyan accent-2" to="songs/create" light medium absolute right middle fab>
          <v-icon>add</v-icon>
        </v-btn>
        <div class="song" v-for="song in songs" :key="song.id">
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

              <v-btn dark class="cyan" :to="`/songs/${song.id}`">
                View Song
              </v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImage" />
            </v-flex>
          </v-layout>
        </div>
      </panel>
     </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data() {
    return {
      songs: null
    }
  },
  async mounted() {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped>

.song{
  padding: 20px;
  height: 330px;
  overflow:hidden;
}

.song-title{
  font-size: 30px;
}

.song-artist{
  font-size: 24px;
}

.song-genre{
  font-size: 18px;
}

.album-image {
  width: 40%;
  margin: 0 auto;
}
</style>
