const test = require('ava')
const sinon = require('sinon')
const plugin = require('../plugin')
const { T } = require('ramda')

test('adds the proper npm module, component example, patches a file', async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy()
  const addPluginComponentExample = sinon.spy()

  // mock a context
  const context = {
    ignite: { addModule, addPluginComponentExample },
    print: {
      warning: T,
      info: T,
      colors: { cyan: T, bold: T }
    }
  }

  await plugin.add(context)
  t.true(
    addModule.calledWith('react-native-maps', { version: '0.26.1', link: false })
  )
  t.true(
    addPluginComponentExample.calledWith('MapsExample.js.ejs', {
      title: 'Maps Example'
    })
  )
})
