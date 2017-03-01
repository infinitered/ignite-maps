/**
 * Runs long-running integration tests and dumps the output into ./out.
 * 
 * Run with `npm run integration`.
 */

const test = require('ava')
const execa = require('execa')
const jetpack = require('fs-jetpack')
const { which, exec, exit } = require('shelljs')

const TEST_DIR = process.cwd()
const IGNITE = which('ignite').stdout
const IGNITE_PATH = exec(`python -c "from os import path; print(path.realpath('${IGNITE}'));"`).stdout.replace('/ignite-cli/bin/ignite', '')
const RUN_DIR = 'test/integration/out/new'
const APP = 'IgniteApp'
// const PACKAGE_JSON = `${APP}/package.json`
// const IGNITE_JSON = `${APP}/ignite/ignite.json`

const checkDependencies = async () => {
  const rnInstalled = await which('react-native')
  if (!rnInstalled) {
    console.error('No react-native CLI found. Please install react-native-cli before running integration tests.')
    exit(1)
  }
  const igniteInstalled = await which('ignite')
  if (!igniteInstalled) {
    console.error('No ignite CLI found. Please install ignite-cli before running integration tests.')
    exit(1)
  }
}

// create a fresh ignited app with --min
test.before(async () => {
  await checkDependencies()

  jetpack.remove(RUN_DIR)
  jetpack.dir(RUN_DIR)
  process.chdir(RUN_DIR)
  const output = exec(`IGNITE_PLUGIN_PATH=${IGNITE_PATH} ${IGNITE} new ${APP} --min`)
  console.log(output)
})

// always clean up
test.after.always(() => {
  process.chdir(TEST_DIR)
  // jetpack.remove(RUN_DIR)
})

test('app directory', async t => {
  // t.is(jetpack.exists(`${APP}/node_modules/react-native`), 'dir')
})
