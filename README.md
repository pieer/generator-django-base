# Django 1.7 generator  [![Stories in Ready](https://badge.waffle.io/waffleio/waffle.io.svg)](https://waffle.io/santonocito/generator-django-base)

![Generator Django Base](http://i.imgur.com/95tGJ0i.png?1)

> [Yeoman](http://yeoman.io) generator that scaffolds out a Django 1.7 base template with HTML5Boilerplate and Twitter Bootstrap.
 
## About
 
This template is based off of the work of Two Scoops of Django and Xenith, as well as experience with other Django layouts/project templates.

This project template is designed for Django 1.7.

## Requirements

- [Python 2.6 or 2.7](https://www.python.org/)
- [pip](https://pypi.python.org/pypi/pip)
- [virtualenv](http://virtualenv.readthedocs.org/en/latest/)
- [NodeJS](http://nodejs.org/)
- [Yeoman](http://yeoman.io)

## Getting Started

Install `generator-django-base` from npm:
```
npm install -g generator-django-base
```

Make a virtualenv and `cd` into it:
```
virtualenv myproject --no-site-packages
cd myproject
```

Make your project directory and `cd` into it:
```
mkdir myproject && cd $_
```

Run `yo django-base`:
```
yo django-base
```

## What do you get?

You get the following directory structure:

```
.
├── project
│   ├── base
│       ├── models.py
│       ├── urls.py
│       └── views.py
│   ├── static
│       ├── css
│       ├── img
│       └── js
│   ├── templates
│       ├── _layouts
│       ├── base
│       ├── 403.html
│       ├── 404.html
│       └── 500.html
│   ├── project
│       ├── settings
│           ├── base.py
│           ├── local.py
│           └── test.py
│       ├── urls.py
│       └── wsgi.py
├── requirements
│       ├── base.txt
│       ├── local.txt
│       └── test.txt
├── .gitignore
├── bower.json
├── package.json
├── README.md
└── requirements.txt
```

## Features

By default, this project template includes:

A set of basic templates built from HTML5Boilerplate 4.1.0 and Twitter Bootstrap 3.2.0 (located in the base app, with css and javascript loaded from CloudFlare CDN by default).

__Templating__
* *django_compressor*: for compressing javascript/css/less/sass

__Security__
* *bcrypt*: uses bcrypt for password hashing by default

__Background Tasks__
* *Celery*

__Migrations__
* *Django built-in migrations*

__Caching__
* *python-memcached*

__Admin__
* *django-debug-toolbar*: for development and production (enabled for superusers)


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
