<template>
  <transition name="slide" appear>
    <div class="singer-details"></div>
  </transition>
</template>

<script>
import { getSingerDetails } from 'api/singer'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

export default {
  computed: {
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
  components: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-details {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
