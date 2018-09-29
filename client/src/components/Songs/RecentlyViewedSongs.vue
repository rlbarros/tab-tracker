<template>
  <panel title="Recently Viewed songs">
    <v-data-table
      :headres="headers"
      :pagination.sync="pagination"
      :items="histories">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.artist}}
        </td>
         <td class="text-xs-right">
          {{props.item.genre}}
        </td>
         <td class="text-xs-right">
          {{props.item.timeCreated}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        },
        {
          text: 'Genre',
          value: 'genre'
        },
        {
          text: 'Visited At',
          value: 'timeCreated'
        }
      ],
      pagination: {
        sortBy: 'timeCreated',
        descending: true
      },
      histories: []
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user'])
  },
  async mounted() {
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      this.histories = (await SongHistoryService.index()).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
