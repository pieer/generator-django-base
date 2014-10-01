'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var djangoUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var folderName = path.basename(process.cwd());

yeoman.generators.Base.prototype.pipInstall = function (paths, options, cb) {
    return this.runInstall('pip', paths, options, cb);
};

var DjangoGenerator = module.exports = function DjangoGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

   this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function() {
                this.pipInstall(null, {
                    requirement: 'requirements.txt'
                }, function() {
                    this.log
                        .write()
                        .info("Project name is '%s'", this.projectName)
                        .info("Admin name is '%s'", this.adminName)
                        .info("Admin email is '%s'", this.adminEmail)
                        .write()
                        .info("To start the server please follow these steps:")
                        .info("Enter in your project folder: cd " + this.projectName)
                        .info("Run: python manage.py syncdb --migrate")
                        .info("Run: python manage.py runserver")
                        .write();
                }.bind(this));
            }.bind(this)
        });
    });

    this.pkg = require('../package.json');
    this.secretKey = djangoUtils.generateRandomString();
    this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(DjangoGenerator, yeoman.generators.Base);

DjangoGenerator.prototype.welcome = function welcome() {
    this.log(this.yeoman);
    this.log(
        chalk.magenta(
            'Thanks for using django-base! If you want to say hi write me an email at hello@marcosantonocito.com' +
            '\n'
        )
    );
};

DjangoGenerator.prototype.askForProjectInfo = function askForProjectInfo() {
    var cb = this.async();

    var prompts = [{
        type: 'input',
        name: 'projectName',
        message: 'What is your Django project name?',
        default: folderName
    }, {
        type: 'input',
        name: 'adminName',
        message: 'What is the admin name?',
        default: 'Your Name'
    }, {
        type: 'input',
        name: 'adminEmail',
        message: 'What is the admin email?',
        default: 'your_email@domain.com'
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.adminName = props.adminName;
        this.adminEmail = props.adminEmail;

        cb();
    }.bind(this));
};

DjangoGenerator.prototype.askForDatabase = function askForDatabase() {
    var cb = this.async();
    function isActive(answers) { return answers && answers.database && (answers.database == 'mysql' || answers.database == 'postgresql'); };

    var prompts = [{
        type: 'list',
        name: 'database',
        message: 'Which database would you like to use?',
        choices: [
            {
                value: 'mysql',
                name: 'MySQL',
            }, {
                value: 'sqlite3',
                name: 'SQLite3'
            }, {
                value: 'postgresql',
                name: 'PostgreSQL'
            }
        ]}, {
            type: 'input',
            name: 'databaseName',
            message: 'Please enter the database name',
            default: this.projectName
        }, {
            when: function(answers){ return isActive(answers); },
            type: 'input',
            name: 'databaseUser',
            message: 'Please enter the database user',
            default: 'root'
        }, {
            when: function(answers){ return isActive(answers); },
            type: 'input',
            name: 'databasePassword',
            message: 'Please enter the database password'
        }, {
            when: function(answers){ return isActive(answers); },
            type: 'input',
            name: 'databaseHost',
            message: 'Please enter the database host',
            default: 'localhost'
        }, {
            when: function(answers){ return isActive(answers); },
            type: 'input',
            name: 'databasePort',
            message: 'Please enter the database port',
            default: ''
        }
    ];

      this.prompt(prompts, function (props) {
        function isSelected(db) { return db == props.database; }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.dbNone = isSelected('none');
        this.dbMysql = isSelected('mysql');
        this.dbSqlite3 = isSelected('sqlite3');
        this.dbPostgres = isSelected('postgresql');

        if(this.dbSqlite3) {
            this.databaseName = props.databaseName;
        } else if (this.dbMysql || this.dbPostgres) {
            this.databaseName = props.databaseName;
            this.databaseUser = props.databaseUser;
            this.databasePassword = props.databasePassword;
            this.databaseHost = props.databaseHost;
            this.databasePort = props.databasePort;
        }

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
    this.template('requirements/base.txt', 'requirements/base.txt');
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
