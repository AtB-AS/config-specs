# @atb-as/config-specs

> Shared types and validation for fare product type configs

Collects documentation, JSON Specifications and types for Fare Product Types
Configs. Ensures consistent types and mapping for all fare product configs
across projects and organisations.

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

## License

EUPL-1.2
