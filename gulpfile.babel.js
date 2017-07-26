'use strict'

const gulp = require('gulp-param')(require('gulp'), process.argv),
    nodemon = require('gulp-nodemon'),
    replace = require('gulp-replace'),
    fileExists = require('file-exists'),
    chalk = require('chalk'),
    rename = require('gulp-rename')

// gulp.task('make', (controller, model) => {
//     const make = (controller) ? controller : model
//     const makeStr = (controller) ? 'controller' : 'model'
//     const indexChar = make.lastIndexOf('/')
//     const file = make.substr(indexChar + 1)
//     const folder = make.substr(0, indexChar)
//     const extraFile = `${makeStr}s/${make}.js`
//     const blueprint = `config/blueprint/${makeStr}.js`
//
//     if (!fileExists(blueprint)) console.error(chalk.red(`Error: ${makeStr} blueprint not found`))
//
//     if (fileExists(extraFile)) console.error(chalk.red(`Error: ${make} already exist! Pls,try other name`))
//     else {
//         let filename = (makeStr === 'controller') ? `${file}Controller` : file
//         gulp.src([blueprint])
//             .pipe(rename(filename + '.js'))
//             .pipe(replace(makeStr.charAt(0).toUpperCase() + makeStr.slice(1), file))
//             .pipe(gulp.dest(makeStr + 's/' + folder))
//         console.log(chalk.green(`Generate ${file} Success`))
//     }
// })

gulp.task('make-all', (app) => {
  let appArray = ['controller', 'model', 'route']

  // switch (make) {
  //     case 'controller':
  //         appArray = ['controller']
  //         break
  //     case 'model':
  //         appArray = ['model']
  //         break
  //     case 'route':
  //         appArray = ['route']
  //         break
  //     case 'all':
  //         appArray = ['controller', 'model', 'route']
  //         break
  //     case '':
  //         appArray = ['controller', 'model', 'route']
  //         break
  // }

  for (let value of appArray) {
    let makeStr = `${app}-${value}`
    let existsFile = `app/${app}/${makeStr}.js`
    let blueprint = `config/blueprint/${value}.js`

    if (fileExists(existsFile)) console.error(
        chalk.red(`Error: ${makeStr} already exist! Pls,try other name`))
    else {
      if (!fileExists(blueprint)) console.error(
          chalk.red(`Error: ${makeStr} blueprint not found`))
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
            pipe(gulp.dest(`app/${app}/`))
        console.log(chalk.green(`Generate ${makeStr} Success`))

        if (value === 'route') {
          gulp.src('index.js').
              pipe(replace('// routeImport',
                  `app.use('/', require('./app/${app}/${app}-route'))\n// routeImport`)).
              pipe(gulp.dest(''))
        }

      }
    }

  }

})

gulp.task('serve', () => {
  nodemon({
    script: 'index.js'
    , ext: 'js html'
    , env: {'NODE_ENV': 'development'},
  })
})

