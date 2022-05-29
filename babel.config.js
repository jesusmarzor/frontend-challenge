module.exports = {
    presets: ["@babel/react", "@babel/env"],
    plugins: [
        function () {
          return {
            visitor: {
              MetaProperty(path) {
                path.replaceWithSourceString('process')
              },
            },
          }
        },
      ],
}