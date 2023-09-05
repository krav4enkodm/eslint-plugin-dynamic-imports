# no-restricted-paths

## Description

Disallows specified paths for dynamic imports

This rule allows you to specify imports that you don’t want to use in your application.

It applies to dynamic imports only, not static ones.

This rule uses the [micromatch](https://www.npmjs.com/package/micromatch) library for path matching

## Options

It is possible to specify imports you want to restrict with passing strings. You will get a default error message for forbidden paths.

```json
{
  "no-restricted-paths": [
    "error",
    "path/to/restricted/1",
    "path/to/restricted/2"
  ]
}
```

You can also specify paths you want to restrict with the object structure, which allows you to define custom error messages. You can set the error message for each option or skip it to show the default one.

```json
{
  "no-restricted-paths": [
    "error",
    {
      "path": "path/to/restricted/1",
      "message": "This path is forbidden"
    },
    {
      "path": "path/to/restricted/2",
      "message": "This path is restricted"
    },
    {
      "path": "path/to/restricted/3"
    }
  ]
}
```

There is an option to restrict the paths with global matchers

```json
{
  "no-restricted-paths": [
    "error",
    {
      "path": "foo/**"
    },
    {
      "path": "**/bar/**"
    }
  ]
}
```

## Examples

`.eslintrc`

```json
{
  "no-restricted-paths": [2, "path/to/foo", "bar/**"]
}
```

```js
// good
import('path/to/bar')
import('path/to/baz')
import('foo/bar/baz')

// bad
import('path/to/foo')
import('bar/baz')
import('./bar/baz')
```
