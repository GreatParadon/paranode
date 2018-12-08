// 'use strict'

const gulp = require('gulp-param')(require('gulp'), process.argv),
  replace = require('gulp-replace'),
  fileExists = require('file-exists'),
  chalk = require('chalk'),
  rename = require('gulp-rename')

gulp.task('make-all', (app) => {
  let appArray = ['controller', 'model', 'route']

  for (let value of appArray) {
    let makeStr = `${app}-${value}`
    let existsFile = `./src/app/${app}/${makeStr}.js`
    let blueprint = `./src/config/blueprint/${value}.js`

    // console.log(fileExists.sync(existsFile))

    if (fileExists.sync(existsFile)) {
      console.error(chalk.red(`Error: ${makeStr} already exist! Pls,try other name`))
    } else {
      if (!fileExists.sync(blueprint))
        console.error(chalk.red(`Error: ${makeStr} blueprint not found`))
      else {
        let replaceValue = ''
        let replaceApp = ''
        switch (value) {
          case 'controller':
            replaceValue = value.charAt(0).toUpperCase() + value.slice(1)
            replaceApp = app.charAt(0).toUpperCase() + app.slice(1)
            break
          case 'model':
            replaceValue = value.charAt(0).toUpperCase() + value.slice(1)
            replaceApp = app.charAt(0).toUpperCase() + app.slice(1)
            break
          case 'route':
            replaceValue = 'AppRoute'
            replaceApp = app
            break
        }
        gulp.src([blueprint]).
        pipe(rename(makeStr + '.js')).
        pipe(replace(replaceValue, replaceApp)).
        pipe(replace('modelImport', `${app}-model`)).
        pipe(replace('LowerName', app)).
        pipe(replace('RouteController',
          app.charAt(0).toUpperCase() + app.slice(1) + 'Controller')).
        pipe(gulp.dest(`./src/app/${app}/`))
        console.log(chalk.green(`Generate ${makeStr} Success`))

        if (value === 'route') {
          gulp.src('./src/index.js').
          pipe(replace('// routeImport',
            `app.use('/', require('./app/${app}/${app}-route'))\n// routeImport`)).
          pipe(gulp.dest('./src'))
        }

      }
    }

  }

})