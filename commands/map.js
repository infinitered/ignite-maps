// @cliDescription  Generates a map component.
// @cliExample  ignite generate map StoreLocator
// Generates a map component that can be inserted into any screen.
// ----------------------------------------------------------------------------
module.exports = async function (context) {
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate map <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)

  // Copies the `map.js.ejs` in the templates folder
  // into App/Components/${name}.js.
  const copyJobs = [{
    template: 'map-component.js.ejs',
    target: `App/Components/${name}.js`
  }, {
    template: 'map-styles.js.ejs',
    target: `App/Components/Styles/${name}Styles.js`
  }]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, copyJobs, { name: name })
}
