module.exports = {
  "transpileDependencies": [
    "vuetify"
  ]
}

module.exports = {
  devServer: {
    proxy: 'http://localhost:8001/api'
  }
}