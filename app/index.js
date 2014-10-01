'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var djangoUtils = require('../util.js');
var yeoman = require('yeoman-generator');


var folderName = path.basename(process.cwd());

var DjangoGenerator = module.exports = function DjangoGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.secretKey = djangoUtils.generateSecretKey();

    this.pkg = require('../package.json');
    this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(DjangoGenerator, yeoman.generators.Base);

DjangoGenerator.prototype.askForProjectName = function askForProjectName() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'projectName',
        message: 'What is your Django project name?',
        default: folderName
    }, {
        name: 'adminName',
        message: 'What is the name of the admin?'
    }, {
        name: 'adminEmail',
        message: 'What is the email of the admin?'
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.adminName = props.adminName;
        this.adminEmail = props.adminEmail;

        cb();
    }.bind(this));
};

DjangoGenerator.prototype.askForFeature = function askForFeature() {
    var cb = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [
            {
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: true
            }, {
                name: 'Sass with Compass',
                value: 'includeCompass',
                checked: true
            }, {
                name: 'Less',
                value: 'includeLess',
                checked: false
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            }, {
                name: 'RequireJS',
                value: 'includeRequireJS',
                checked: true
            }
        ]
    }];

    this.prompt(prompts, function (answers) {
        var features = answers.features;
        function hasFeature(feat) { return features.indexOf(feat) !== -1; }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeCompass = hasFeature('includeCompass');
        this.includeLess = hasFeature('includeLess');
        this.includeBootstrap = hasFeature('includeBootstrap');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeRequireJS = hasFeature('includeRequireJS');

        cb();
    }.bind(this));
};

DjangoGenerator.prototype.project = function project() {
    var projectRoot = this.projectName;
    var mainFolder = path.join(projectRoot, this.projectName);

    this.template('project/manage.py', path.join(projectRoot, 'manage.py'));

    this.copy('project/project/__init__.py', path.join(mainFolder, '__init__.py'));
    this.template('project/project/urls.py', path.join(mainFolder, 'urls.py'));
    this.template('project/project/wsgi.py', path.join(mainFolder, 'wsgi.py'));

    this.copy('project/project/settings/__init__.py', path.join(mainFolder, 'settings/__init__.py'));
    this.template('project/project/settings/base.py', path.join(mainFolder, 'settings/base.py'));
    this.copy('project/project/settings/local.py', path.join(mainFolder, 'settings/local.py'));
    this.copy('project/project/settings/production.py', path.join(mainFolder, 'settings/production.py'));
    this.copy('project/project/settings/test.py', path.join(mainFolder, 'settings/test.py'));
};

DjangoGenerator.prototype.requirements = function requirements() {
    this.copy('requirements/base.txt', 'requirements/base.txt');
    this.copy('requirements/local.txt', 'requirements/local.txt');
    this.copy('requirements/production.txt', 'requirements/production.txt');
    this.copy('requirements/test.txt', 'requirements/test.txt');
    this.copy('requirements.txt', 'requirements.txt');
};

DjangoGenerator.prototype.git = function git() {
    this.copy('_gitignore', '.gitignore');
};
