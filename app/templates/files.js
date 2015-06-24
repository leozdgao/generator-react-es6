module.exports = {
    js: [
        'src/js/**/*.js',
        'src/js/**/*.jsx'
    ],
    css: [
        'src/css/**/*.css'
    ],
    views: [
        'index.html'
    ],
    vendor: [
      './node_modules/react/dist/react.min.js'
    ],
    destCss: 'style.css',
    release: './dist',
    entry: './index.html'
};
