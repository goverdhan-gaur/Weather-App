/* eslint-disable @typescript-eslint/no-var-requires */
const argv = require('minimist')(process.argv.slice(2))
const path = require('path')
const prompt = require('./_input')
const create = require('./_create')

const args = argv ? { name: argv.n, stories: argv.s } : {}

const basePath = path.join(__dirname, '../../src/components/')

const generateComponent = async () => {
  if (!args.name) {
    await prompt((input) => {
      const dirPath = path.join(basePath, input.name)
      create(dirPath, input)
    })
  } else {
    const dirPath = path.join(basePath, args.name)
    create(dirPath, args)
  }
}

generateComponent()
