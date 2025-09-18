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
- [x] Payment Types
- [x] Other
- [x] Reference Data
- [x] Stop Signal Button Config
- [ ] Schedules
- [ ] Feedback Questions
- [ ] App Texts

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
# yaml-language-server: $schema=https://raw.githubusercontent.com/AtB-AS/config-specs/refs/heads/main/schema-definitions/other.json
enableTokenToggleRestrictions: true
tokenToggleMaxLimit: 3
defaultTariffZone: NOR:TariffZone:8040
defaultFareZone: NOR:FareZone:8040
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
tests should never fail unless it is very intentional. These are meant to ensure
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

## Release

1. Once your changes are ready, make sure to run `yarn build`.
2. Merge a PR to main, where the commit message follows the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
3. The Github action `release-please-action` will create a PR to update the package version and changelog.
    - `feat` will be a minor release.
    - `fix` will be a patch release.
    - Adding `!` after the prefix (e.g. `feat!`) means it is a breaking change, and will be a major release. This includes any changes to the public API that requires users of the package to update any code.
    - Other prefixes such as `chore` or `refactor` will not trigger a release.
4. Merge the release PR to main to trigger a NPM release.

> [!NOTE]
> In case you want to create a release with a different version number than the one suggested by release-please, you can make an empty commit on master with commit message on this format:
> ```
> chore: release v1.2.3
>
> release-as: 1.2.3
> ```

For more details, see [release-please-action](https://github.com/googleapis/release-please-action).

## License

EUPL-1.2
