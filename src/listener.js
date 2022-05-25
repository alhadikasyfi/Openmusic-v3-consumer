class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    // binding
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const songs = await this._playlistService.getSongsFromPlaylist(playlistId);
      const playlist = await this._playlistService.getPlaylistById(playlistId);
      const playlistContainSongs = { ...playlist, songs };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist: playlistContainSongs }));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { Listener };
