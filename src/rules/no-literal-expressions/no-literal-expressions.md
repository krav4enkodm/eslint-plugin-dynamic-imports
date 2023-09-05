# no-literal-expressions

## Description

Disallows the use of literal expressions for dynamic imports

It applies to dynamic imports only.

## Options

Simple configuration does report with a default error message:

```json
{
  "no-literal-expressions": 2
}
```

Also you can specify your own error message:

```json
{
  "no-literal-expressions": ["error", "The custom error message"]
}
```

## Examples

`.eslintrc`

```json
{
  "no-literal-expressions": 2
}
```

```js
// good
import('path/to/module')
import(`path/to/module`)
import("path/to/module")

// bad
import('path' + '/' + 'to' + '/' + 'module')
import(`path/${to}/module`)
import("path" + "/" + "to" + "/" + "module")
```
