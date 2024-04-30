# @atb-as/config-specs

> Shared types and validation for configs

Collects documentation, JSON Specifications and types for configs. Ensures
consistent types and mapping for all fare product configs across projects and
organisations.

## Progress

- [x] Fare Product Types
- [x] Travel Search Filters
- [x] Mobility operators
- [x] Urls
- [x] Harbor connection overrides
- [x] Notification config
- [ ] Payment Types
- [ ] Other
- [ ] Reference Data

## Usage

### API and Types

```js
import {ZoneSelectionMode} from '@atb-as/config-specs';

const selectedZone: ZoneSelectionMode =
  ZoneSelectionMode.parse('multiple-stop');
//> Throws error if not multiple-stop is valid.

const selectedZone2: ZoneSelectionMode =
  ZoneSelectionMode.safeParse('multiple-stop');
//> selectedZone2.success = true | false
```

### Usage in YAML validation

```yaml
# yaml-language-server: $schema=https://github.com/atb-as/fare-product-type-configs/schema-definitions/other.json
enableTokenToggleRestrictions: true
tokenToggleMaxLimit: 3
defaultTariffZone: NOR:TariffZone:8040
vatPercent: 12
```

#### Running as CLI

```sh
Usage: npx @atb-as/config-specs -s [schema] -f [file]

Options:
      --version  Show version number                                   [boolean]
  -f, --file     file to validate                                     [required]
  -s, --schema   choose a schema
         [required] [choices: "fareProductTypeConfigs", "other", "paymentTypes",
                                                   "travelSearchFilters", "url"]
  -h, --help     Show help                                             [boolean]

Examples:
  npx @atb-as/config-specs -s other -f other.json  Validate other.json with position specification
  npx @atb-as/config-specs -s other -f other.yaml  Validate other.yaml with position specification
```

## Install

```
yarn add @atb-as/config-specs
```

## Tests and fixtures

Note contract/fixture tests in
[src/tests/contract-fixtures-tests](./src/tests/contract-fixtures-tests). These
tests should never fail unless it is very intentional. These are ment to ensure
backwards compatibility with older apps.

If they fail you need to ensure that the change is intentional and that older
apps refering to the data that is the cause of change is no longer in use.

## Scope and goal of package

Goal of this package is to ensure data quality and consistent data across remote
configuration and usage over time for multiple consumers.

This package should collect specification and validation (incl. types) for data
stored in Firestore. This should ensure easier consistent validation and data
quality across Firestore, Webshop and App for all organisations involved.

1. Collect specifications ("the standard"™)
1. Collect documentation ("how to use the standard")
1. Type generation and Schema validation generation
1. Input validation (Data INTO Firestore)
1. Data decoding / encoding validation. (Data OUT of Firestore)

## Release package

After your changes are merged to the main branch:

1. Checkout the latest changes on main branch
2. Make sure you are authenticated through npm by running `npm whoami`
3. Make sure your npm user has access to publish packages to AtB's npm repo.
4. Run `yarn build` to build the package.
5. Tag a new release by running `yarn version`:

- **Major**: Breaking change. This version _require_ you to do code
  modifications after upgrading on the consumer side.
- **Minor**: This version extends functionality.
- **Patch**: This version affects no APIs at all, just changes to existing code.

6. Run `npm publish` to publish the package to npm.
7. Push to Github: `git push origin main`
8. Push tags to Github: `git push origin main --tags`

_TODO: Packages should be automatically released when merging a PR created by
`release-please-action` Github Action. Changelog and releases should
automatically be updated._

## License

EUPL-1.2
