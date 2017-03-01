const test = require('ava')
const sinon = require('sinon')
const plugin = require('../../index')

test('adds the proper npm module, component example, patches a file', async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy()
  const addComponentExample = sinon.spy()
  const exists = sinon.stub().returns(false)
  const copy = sinon.spy()
  const patchInFile = sinon.spy()

  // mock a context
  const context = {
    ignite: { addModule, addComponentExample, patchInFile }
  }

  await plugin.add(context)
  t.true(addModule.calledWith('react-native-maps', { version: '0.13.0', link: true }))
  t.true(
    addComponentExample.calledWith('MapsExample.js', {
      title: 'Maps Example'
    })
  )
  // Gradle patching
  t.true(patchInFile.called)
  t.is(patchInFile.args[0][0], `${process.cwd()}/android/app/build.gradle`)
  t.true(patchInFile.args[0][1].insert.length > 0)
  t.true(patchInFile.args[0][1].replace.length > 0)
})
