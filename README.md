# @atb-as/fare-product-type-configs

> Shared types and validation for fare product type configs

Collects documentation, JSON Specifications and types for Fare Product Types
Configs. Ensures consistent types and mapping for all fare product configs
across projects and organisations.

## Usage

### API and Types

```js
import {ZoneSelectionMode} from '@atb-as/fare-product-type-configs';

const selectedZone: ZoneSelectionMode =
  ZoneSelectionMode.parse('multiple-stop');
// Throws error if not multiple-stop is valid.
```

### Usage in YAML validation

```yaml
# yaml-language-server: $schema=https://github.com/atb-as/fare-product-type-configs/schema-definitions/other.json
enableTokenToggleRestrictions: true
tokenToggleMaxLimit: 3
defaultTariffZone: NOR:TariffZone:8040
vatPercent: 12
```

```sh
npx @atb-as/fare-product-type-configs validate other.yaml
```

## Install

```
$ yarn add @atb-as/fare-product-type-configs
```

## License

EUPL-1.2
