module.exports = {
  description: 'Generates a map callout component.',
  run: async function (context) {
    const { parameters, strings, print, ignite } = context
    const { pascalCase, isBlank } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info(`ignite generate map-callout <name>\n`)
      print.info('A name is required.')
      return
    }

    const name = pascalCase(parameters.first)

    // Copies the callout template
    // into App/Components/${name}.js.
    const copyJobs = [{
      template: 'map-callout-component.js.ejs',
      target: `App/Components/${name}.js`
    }, {
      template: 'map-callout-styles.js.ejs',
      target: `App/Components/Styles/${name}Styles.js`
    }]

    // make the templates and pass in props with the third argument here
    await ignite.copyBatch(context, copyJobs, { calloutName: name })
  }
}