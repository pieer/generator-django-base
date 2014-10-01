# Django 1.6.5 generator  [![Stories in Ready](https://badge.waffle.io/waffleio/waffle.io.svg)](https://waffle.io/santonocito/generator-django-base)

> [Yeoman](http://yeoman.io) generator for Django 1.6 - lets you quickly set up a project with sensible defaults and best practices.

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
virtualenv myproject --no-site-packages
cd myproject
```

Make your project directory and initiate the generator:
```
mkdir myproject && cd $_
yo django-base
```

Installation of dependencies:
```
# In development
pip install -r requirements/local.txt

# For production
pip install -r requirements.txt
```

Syncdb and run:
```
cd myproject
python manage.py syncdb
python manage.py runserver
```
