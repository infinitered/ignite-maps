// Ignite plugin for Maps
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-maps'
const NPM_MODULE_VERSION = '0.16.4'
const PLAY_SERVICES_VERSION = '16.1.0'
// const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()
const EXAMPLE_FILE = 'MapsExample.js.ejs'

const GRADLE_CONFIG = `
    compile(project(':react-native-maps')) {
        exclude group: 'com.google.android.gms', module: 'play-services-base'
        exclude group: 'com.google.android.gms', module: 'play-services-maps'
    }
    compile 'com.google.android.gms:play-services-base:${PLAY_SERVICES_VERSION}'
    compile 'com.google.android.gms:play-services-maps:${PLAY_SERVICES_VERSION}'
`

const add = async function (context) {
  const { ignite, print } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { version: NPM_MODULE_VERSION, link: true })
  // add our component example to the plugin component examples screen
  await ignite.addPluginComponentExample(EXAMPLE_FILE, { title: 'Maps Example' })

  // add the app build gradle config
  ignite.patchInFile(`${APP_PATH}/android/app/build.gradle`, {
    insert: GRADLE_CONFIG,
    replace: `\n    compile project(':react-native-maps')`
  })

  print.warning(`⚠️  Using Google Maps on Android? ⚠️`)
  print.info('')
  print.info(`  If you're using Google Maps on Android (this is the default), there's still another step.`)
  print.info(`  You must add an API Key from ${print.colors.cyan('https://developers.google.com/maps/android/?authuser=1')}`)
  print.info('')
  print.info('  It is free for apps that are not behind a paywall or a login. See')
  print.info(`  Google's plans page for more details.`)
  print.info('')
  print.info(`  Place the key in ${print.colors.bold('android/app/src/main/AndroidManifest.xml')}`)
  print.info('')
  print.info(`  As a child of the ${print.colors.bold('<application>')} tag, add this: `)
  print.info('')
  print.info(print.colors.bold('        <meta-data'))
  print.info(print.colors.bold('            android:name="com.google.android.geo.API_KEY"'))
  print.info(print.colors.bold('            android:value="PASTE-YOUR-API-KEY-HERE-FOR-A-GOOD-TIME" />'))
  print.info('')
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
