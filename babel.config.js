const development = process.env.NODE_ENV === 'development'

module.exports = function(api) {
  api.cache(true)

  const presets = [
      ["@babel/preset-env", {
        "useBuiltIns": "usage"
      }],
      ["@babel/preset-react", {
        "development": development
      }]
  ]

  return { presets }
}
