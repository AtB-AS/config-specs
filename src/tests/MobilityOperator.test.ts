import {assertType, expect, test} from 'vitest';
import {
  MobilityOperator,
  MobilityOperatorType,
  OperatorBenefit,
  OperatorBenefitType,
} from '../mobility';

test('MobilityOperator', () => {
  expect(
    () => MobilityOperator.parse('foo'),
    'Config must be an object',
  ).toThrowError();
  expect(
    () => MobilityOperator.parse({id: 'foo'}),
    'Name is required',
  ).toThrowError();
  expect(
    () => MobilityOperator.parse({name: 'foo'}),
    'Id is required',
  ).toThrowError();
  expect(
    () => MobilityOperator.parse({id: 'id', name: 'foo'}),
    'FormFactor is required',
  ).toThrowError();
  expect(
    () => MobilityOperator.parse({id: 'id', name: 'foo', formFactors: []}),
    'FormFactors must have at least one value',
  ).toThrowError();
  expect(
    MobilityOperator.parse({
      id: 'id',
      name: 'default showInApp',
      formFactors: ['SCOOTER'],
    }).showInApp,
    'showInApp should default to false',
  ).toEqual(false);

  assertType<MobilityOperatorType>(
    MobilityOperator.parse({
      id: 'id',
      name: 'Some',
      formFactors: ['SCOOTER'],
      showInApp: true,
    }),
  );
});

test('Mobility operator benefits', () => {
  expect(
    () => OperatorBenefit.parse({}),
    'Benefit must have id',
  ).toThrowError();
  expect(
    () => OperatorBenefit.parse({id: 'something'}),
    'Id must be valid',
  ).toThrowError();

  assertType<OperatorBenefitType>({
    id: 'free-unlock',
    headingWhenActive: [
      {lang: 'nob', value: 'Overkrift når aktiv'},
      {lang: 'en', value: 'Heading when active'},
    ],
    descriptionWhenActive: [
      {lang: 'nob', value: 'Beskrivelse når aktiv'},
      {lang: 'en', value: 'Description when active'},
    ],
    descriptionWhenNotActive: [
      {lang: 'nob', value: 'Beskrivelse når ikke aktiv'},
      {lang: 'en', value: 'Description when not active'},
    ],
    headingWhenNotActive: [
      {lang: 'nob', value: 'Overskrift når ikke aktiv'},
      {lang: 'en', value: 'Heading when not active'},
    ],
    callToAction: {
      url: 'https://click.me',
      name: [
        {lang: 'nob', value: 'Aktiver'},
        {lang: 'en', value: 'Do it!'},
      ],
    },
    formFactors: ['SCOOTER', 'CAR'],
  });
});
