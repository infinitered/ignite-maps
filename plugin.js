// Ignite plugin for Maps
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-maps'
const NPM_MODULE_VERSION = '0.13.0'
const PLAY_SERVICES_VERSION = '10.2.0'
// const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()
const EXAMPLE_FILE = 'MapsExample.js'

const GRADLE_CONFIG = `
    compile(project(':react-native-maps')) {
        exclude group: 'com.google.android.gms', module: 'play-services-base'
        exclude group: 'com.google.android.gms', module: 'play-services-maps'
    }
    compile 'com.google.android.gms:play-services-base:${PLAY_SERVICES_VERSION}'
    compile 'com.google.android.gms:play-services-maps:${PLAY_SERVICES_VERSION}'
`

const add = async function (context) {
  const { ignite } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { version: NPM_MODULE_VERSION, link: true })
  // add our component example to the plugin component examples screen
  await ignite.addPluginComponentExample(EXAMPLE_FILE, { title: 'Maps Example' })

  // add the app build gradle config
  ignite.patchInFile(`${APP_PATH}/android/app/build.gradle`, {
    insert: GRADLE_CONFIG,
    replace: `\n    compile project(':react-native-maps')`
  })

  // TODO: Add API key to
  // android/app/src/main/AndroidManifest.xml
  // in <application>:
  /*
      <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="AIzaSyBcCdKMCWtxN1mXHlVE6z5cLVXIPWaEcso"/>
   */
}

/**
 * Remove from the project.
 */
const remove = async function (context) {
  const { ignite } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })
  // remove our component example from the plugin component examples screen
  await ignite.removePluginComponentExample(EXAMPLE_FILE)

  // Remove the app build gradle config we added
  ignite.patchInFile(`${APP_PATH}/android/app/build.gradle`, {
    delete: GRADLE_CONFIG
  })

  // TODO: Remove API key
  // android/app/src/main/AndroidManifest.xml
}

module.exports = { add, remove }
