// @cliDescription  Generates map utility functions.
// @cliExample  ignite generate map-utilities
// Generates a map utilities file in App/Lib
// ----------------------------------------------------------------------------
module.exports = async function (context) {
  const { ignite } = context

  // TODO: Detect if Ramda is not installed and error
  // or install for them?

  // Copies the `MapHelpers.js.ejs` in the templates folder
  // into App/Lib/MapHelpers.js.
  const copyJobs = [{
    template: 'MapHelpers.js.ejs',
    target: `App/Lib/MapHelpers.js`
  }]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, copyJobs, {})
}
