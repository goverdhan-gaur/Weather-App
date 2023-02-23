/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const storiesTemplate = require('./templates/stories')
const tsxTemplate = require('./templates/tsx')
const styledTemplate = require('./templates/styledcomponent')

const createDir = (dirPath, callback) => {
  fs.mkdir(dirPath, (err) => {
    typeof callback === 'function' && callback(err)
  })
}

const createJsx = (dirPath, filename, template, callback) => {
  fs.writeFile(`${dirPath}/${filename}.tsx`, template(filename), (err) => {
    callback(err)
  })
}

const createStyled = (dirPath, filename, template, callback) => {
  fs.writeFile(`${dirPath}/${filename}.styled.ts`, template(), (err) => {
    callback(err)
  })
}

const createStories = (dirPath, filename, template, callback) => {
  fs.writeFile(
    `${dirPath}/${filename}.stories.tsx`,
    template(filename),
    (err) => {
      callback(err)
    }
  )
}

const createFiles = (dirPath, input) => {
  createJsx(dirPath, input.name, tsxTemplate, (err) => {
    !err && console.info('Component File Created!!')
    if (err) {
      console.info(err)
      process.exit()
    } else {
      createStyled(dirPath, input.name, styledTemplate, (err) => {
        !err && console.info('Styles File Created!!')
        if (err) {
          console.info(err)
          process.exit()
        } else {
          input.stories
            ? createStories(dirPath, input.name, storiesTemplate, (err) => {
                !err && console.info('Stories File Created!!')
                process.exit()
              })
            : ''
        }
      })
    }
  })
}
function create(dirPath, input) {
  createDir(dirPath, (err) => {
    if (err) {
      console.info('Could not create directory. Try Again', err)
      process.exit()
    } else {
      console.info('Directory created Successfully.')
      createFiles(dirPath, input)
    }
  })
}
//
module.exports = create
