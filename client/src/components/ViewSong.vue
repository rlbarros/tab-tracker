<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field v-model="song.title" label="Title" required :rules="[rules.required]" outline/>
        <v-text-field v-model="song.artist" label="Artist" required :rules="[rules.required]" outline/>
        <v-text-field v-model="song.genre" label="genre" required :rules="[rules.required]" outline/>
        <v-text-field v-model="song.album" label="Album" required :rules="[rules.required]" outline/>
        <v-text-field v-model="song.albumImage" label="Album Image" required :rules="[rules.required]" outline/>
        <v-text-field v-model="song.youtubeId" label="Youtube Id" required :rules="[rules.required]" outline/>
      </panel>
    </v-flex>

    <v-flex xs8>
       <panel title="Song Structure" class="ml-4">
        <v-textarea v-model="song.lyrics" label="Lyrics" required :rules="[rules.required]" outline/>
        <v-textarea v-model="song.tab"  label="Tab" required :rules="[rules.required]" outline/>
       </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
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
    this.song = (await SongsService.index()).data
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
