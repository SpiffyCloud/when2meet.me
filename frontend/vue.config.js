module.exports = {
    // options...
    devServer: {
        disableHostCheck: true
    },
    // Debugging config
    configureWebpack: {
        devtool: 'source-map'
    },
    pages: {
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'When 2 Meet Me'
        }
    }
}
