function getMovieList(url,success){
  wx.request({
    url: url,
    success: function (res) {
      var data = formatMovieList(res.data.subjects)
      success(data)
    }
  })
}

function formatMovieList(data){
  return data.map(function (item) {
    return {
      coverImage: item.images.large,
      title: item.title,
      score: item.rating.average,
      stars: item.rating.stars
    }
  })
}

module.exports = {
  getMovieList: getMovieList
}
