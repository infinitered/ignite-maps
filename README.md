# Ignite Maps Plugin

## Why is this archived?

We really appreciate all the community support in the years since we first released ignite-maps. Our focus has shifted to the latest version of [Ignite](https://github.com/infinitered/ignite), which does not have a plugin-based architecture ([read more here](https://shift.infinite.red/introducing-ignite-4-0-flame-1dfc891f9966)). Feel free to fork this library and continue on its legacy if you want. 

This plugin adds [react-native-maps](https://github.com/airbnb/react-native-maps)
to your [Ignite](https://github.com/infinitered/ignite) React Native project and
configures it so it works out of the box with Ignite projects. It also includes
a couple generators to help you quickly add map components and callouts.

![Map example screenshot](https://cloud.githubusercontent.com/assets/1479215/23394290/279e6692-fd3d-11e6-8f65-37bde4322e80.png)

## Usage

```
$ ignite add maps
$ ignite generate map StoreLocator
```

This adds `ignite-maps` and generates a component at `./App/Components/StoreLocator.js`.

## Contributing

1. Clone this repo
2. Run `npm install`
3. Run `npm test`
4. Check out a branch and make your changes
5. Write tests for those changes
6. Submit a pull request back upstream

## Premium Support

[Ignite](https://infinite.red/ignite) and [ignite-maps](https://github.com/infinitered/ignite-maps), as open source projects, are free to use and always will be. [Infinite Red](https://infinite.red/) offers premium Ignite and ignite-maps support and general mobile app design/development services. Email us at [hello@infinite.red](mailto:hello@infinite.red) to get in touch with us for more details.

## License

This plugin is licensed MIT by Infinite Red, Inc., and was created by
Jamon Holmgren, Steve Kellock, and Robin Heinze.
