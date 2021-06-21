export default {
  switchMusic (state, music) {
    state.playMusic = {
      id: music.id,
      title: music.title,
      alias: music.alias,
      artist: music.artist,
      pic: music.pic,
      src: music.src
    }
  }
}