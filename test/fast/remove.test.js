const test = require('ava')
const sinon = require('sinon')
const plugin = require('../../index')

test('removes maps', async t => {
  const removeModule = sinon.spy()
  const removeComponentExample = sinon.spy()
  const confirm = sinon.stub().returns(true)
  const patchInFile = sinon.spy()

  const context = {
    ignite: { removeModule, removeComponentExample, patchInFile }
  }

  await plugin.remove(context)

  t.true(removeModule.calledWith('react-native-maps', { unlink: true }))
  t.true(removeComponentExample.calledWith('MapsExample.js'))

  // Gradle unpatching
  t.true(patchInFile.called)
  t.is(patchInFile.args[0][0], `${process.cwd()}/android/app/build.gradle`)
  t.true(patchInFile.args[0][1].delete.length > 0)
})
