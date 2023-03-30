export const specifications = [
  'fareProductTypeConfigs',
  'other',
  'paymentTypes',
  'travelSearchFilters',
  'url',
] as const;

export type SchemaNames = typeof specifications[number];
