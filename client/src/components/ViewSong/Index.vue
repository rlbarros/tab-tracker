<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song"/>
      </v-flex>
      <v-flex xs6>
        <panel title="Youtube video" class="ml-4">
          <v-text-field v-model="song.youtubeId" label="Youtube Id" outline/>
        </panel>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <panel title="tabs" class="mt-4">
          <v-textarea v-model="song.tab"  label="Tab" readonly/>
        </panel>
      </v-flex>
      <v-flex xs6>
          <panel title="lyrics" class="ml-4 mt-4">
            <v-textarea v-model="song.lyrics"  label="Lyrics" readonly/>
          </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongMetadata from './SongMetadata'
import SongsService from '@/services/SongsService'
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      }
    }
  },
  async mounted() {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    Panel, SongMetadata
  }
}
</script>

<style scoped>
textarea {
  width: 80%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
