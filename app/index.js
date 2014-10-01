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
        message: 'What is the name of the admin?',
        default: 'Your Name'
    }, {
        name: 'adminEmail',
        message: 'What is the email of the admin?',
        default: 'your_email@domain.com'
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.adminName = props.adminName;
        this.adminEmail = props.adminEmail;

        cb();
    }.bind(this));
};

DjangoGenerator.prototype.manage = function manage() {
    this.template('manage.py', path.join(this.projectName, 'manage.py'));
}

DjangoGenerator.prototype.project = function project() {
    var projectFolder = path.join(this.projectName, this.projectName);

    this.copy('__init__.py', path.join(projectFolder, '__init__.py'));
    this.template('project/urls.py', path.join(projectFolder, 'urls.py'));
    this.template('project/wsgi.py', path.join(projectFolder, 'wsgi.py'));

    this.copy('project/settings/__init__.py', path.join(projectFolder, 'settings/__init__.py'));
    this.template('project/settings/base.py', path.join(projectFolder, 'settings/base.py'));
    this.copy('project/settings/local.py', path.join(projectFolder, 'settings/local.py'));
    this.copy('project/settings/production.py', path.join(projectFolder, 'settings/production.py'));
    this.copy('project/settings/test.py', path.join(projectFolder, 'settings/test.py'));
};

DjangoGenerator.prototype.assets = function assets() {
    this.directory('static', path.join(this.projectName, 'static'));
};

DjangoGenerator.prototype.templates = function templates() {
    this.directory('templates', path.join(this.projectName, 'templates'));
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

DjangoGenerator.prototype.readme = function readme() {
    this.template('readme.md', 'README.md');
};
