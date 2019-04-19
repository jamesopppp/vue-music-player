<template>
  <transition name="slide" appear>
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getSingerDetails } from 'api/singer'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

export default {
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetails()
  },
  methods: {
    _getDetails() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }

      getSingerDetails(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then(songs => {
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(item => {
        const { musicData } = item
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
