const development = process.env.NODE_ENV === 'development'

module.exports = function(api) {
  api.cache(true)

  const presets = [
      ["@babel/preset-env", {
          //usage : adds to the top of each file import of polyfills for features used in this file and not supported by target environments
          //entry : replaces imports of core-js to import only required for a target environment modules.
          // bundle size will be less with usage, so I have used it
        "useBuiltIns": "usage",
          "corejs": 3
      }],
      ["@babel/preset-react", {
        "development": development,
          //add to exclude react importing ( from v17)
          "runtime": "automatic"
      }],
      ["@babel/preset-typescript", {
        "onlyRemoveTypeImports": true
      }]
  ]

  return { presets }
}
//Indicates that every file should be parsed as TS, TSX,
// or as TS without JSX ambiguities (depending on the isTSX and disallowAmbiguousJSXLike options).
//allExtensions
//onlyRemoveTypeImports
//add if we want to use optimization for enums optimizeConstEnums
