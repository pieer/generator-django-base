# Django 1.6 generator  [![Stories in Ready](https://badge.waffle.io/waffleio/waffle.io.svg)](https://waffle.io/santonocito/generator-django-base)

[Generator Django Base](http://i.imgur.com/95tGJ0i.png?1)

> [Yeoman](http://yeoman.io) generator that scaffolds out a Django 1.7 base template with HTML5Boilerplate and Twitter Bootstrap.
 
## About
 
This template is based off of the work of Two Scoops of Django and Xenith, as well as experience with other Django layouts/project templates.

This project template is designed for Django 1.7.

## Requirements

- [NodeJS](http://nodejs.org/)
- [Yeoman](http://yeoman.io)

## Getting Started

Install `generator-django-base` from npm:
```
npm install -g generator-django-base
```

Make a virtualenv and `cd` into it:
```
mkvirtualenv myproject
cdvirtualenv
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

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
