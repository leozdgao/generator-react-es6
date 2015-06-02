var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.argument('_appname', { type: String, required: false });
        this._appname = this._.camelize(this._appname);
    },
    prompting: function() {
        if(!this._appanme) {
            var done = this.async();
            this.prompt({
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, function(answers) {
                this.log(answers.name);
                this.appname = answers.name;
                done();
            }.bind(this));  
        }
        else this.appname = this._appname;
    },
    app: function() {
        this.mkdir('src');
        this.template('_package.json', 'package.json');
        this.copy('babelrc', '.babelrc');
        this.copy('files.js', 'files.js');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('index.html', 'index.html');
        this.copy('webpack.config.js', 'webpack.config.js');
    },
    // install all dependencies after setup
    end: function() {
        this.npmInstall();
    }
});