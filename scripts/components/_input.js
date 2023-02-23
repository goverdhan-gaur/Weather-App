/* eslint-disable @typescript-eslint/no-var-requires */
const readline = require('readline')
const capitalize = require('capitalize-first-letter')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function prompt(callback) {
  const obj = {}
  rl.question('What is the component name?', (name) => {
    obj.name = capitalize(name)
    rl.question('Do you want to create stories? Y/N', (stories) => {
      rl.close()
      stories.toLowerCase() === 'y'
        ? (obj.stories = true)
        : (obj.stories = false)
      typeof callback === 'function' && callback(obj)
    })
  })
}

rl.on('close', () => {
  console.info('Generating Component!!')
})

module.exports = prompt
