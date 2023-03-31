import {z} from 'zod';

export enum TransportSubmode {
  SchengenAreaFlight = 'SchengenAreaFlight',
  AirportBoatLink = 'airportBoatLink',
  AirportLinkBus = 'airportLinkBus',
  AirportLinkRail = 'airportLinkRail',
  AirshipService = 'airshipService',
  AllFunicularServices = 'allFunicularServices',
  AllHireVehicles = 'allHireVehicles',
  AllTaxiServices = 'allTaxiServices',
  BikeTaxi = 'bikeTaxi',
  BlackCab = 'blackCab',
  CableCar = 'cableCar',
  CableFerry = 'cableFerry',
  CanalBarge = 'canalBarge',
  CarTransportRailService = 'carTransportRailService',
  ChairLift = 'chairLift',
  CharterTaxi = 'charterTaxi',
  CityTram = 'cityTram',
  CommunalTaxi = 'communalTaxi',
  CommuterCoach = 'commuterCoach',
  CrossCountryRail = 'crossCountryRail',
  DedicatedLaneBus = 'dedicatedLaneBus',
  DemandAndResponseBus = 'demandAndResponseBus',
  DomesticCharterFlight = 'domesticCharterFlight',
  DomesticFlight = 'domesticFlight',
  DomesticScheduledFlight = 'domesticScheduledFlight',
  DragLift = 'dragLift',
  ExpressBus = 'expressBus',
  Funicular = 'funicular',
  HelicopterService = 'helicopterService',
  HighFrequencyBus = 'highFrequencyBus',
  HighSpeedPassengerService = 'highSpeedPassengerService',
  HighSpeedRail = 'highSpeedRail',
  HighSpeedVehicleService = 'highSpeedVehicleService',
  HireCar = 'hireCar',
  HireCycle = 'hireCycle',
  HireMotorbike = 'hireMotorbike',
  HireVan = 'hireVan',
  IntercontinentalCharterFlight = 'intercontinentalCharterFlight',
  IntercontinentalFlight = 'intercontinentalFlight',
  International = 'international',
  InternationalCarFerry = 'internationalCarFerry',
  InternationalCharterFlight = 'internationalCharterFlight',
  InternationalCoach = 'internationalCoach',
  InternationalFlight = 'internationalFlight',
  InternationalPassengerFerry = 'internationalPassengerFerry',
  InterregionalRail = 'interregionalRail',
  Lift = 'lift',
  Local = 'local',
  LocalBus = 'localBus',
  LocalCarFerry = 'localCarFerry',
  LocalPassengerFerry = 'localPassengerFerry',
  LocalTram = 'localTram',
  LongDistance = 'longDistance',
  Metro = 'metro',
  MiniCab = 'miniCab',
  MobilityBus = 'mobilityBus',
  MobilityBusForRegisteredDisabled = 'mobilityBusForRegisteredDisabled',
  NationalCarFerry = 'nationalCarFerry',
  NationalCoach = 'nationalCoach',
  NationalPassengerFerry = 'nationalPassengerFerry',
  NightBus = 'nightBus',
  NightRail = 'nightRail',
  PostBoat = 'postBoat',
  PostBus = 'postBus',
  RackAndPinionRailway = 'rackAndPinionRailway',
  RailReplacementBus = 'railReplacementBus',
  RailShuttle = 'railShuttle',
  RailTaxi = 'railTaxi',
  RegionalBus = 'regionalBus',
  RegionalCarFerry = 'regionalCarFerry',
  RegionalCoach = 'regionalCoach',
  RegionalPassengerFerry = 'regionalPassengerFerry',
  RegionalRail = 'regionalRail',
  RegionalTram = 'regionalTram',
  ReplacementRailService = 'replacementRailService',
  RiverBus = 'riverBus',
  RoadFerryLink = 'roadFerryLink',
  RoundTripCharterFlight = 'roundTripCharterFlight',
  ScheduledFerry = 'scheduledFerry',
  SchoolAndPublicServiceBus = 'schoolAndPublicServiceBus',
  SchoolBoat = 'schoolBoat',
  SchoolBus = 'schoolBus',
  SchoolCoach = 'schoolCoach',
  ShortHaulInternationalFlight = 'shortHaulInternationalFlight',
  ShuttleBus = 'shuttleBus',
  ShuttleCoach = 'shuttleCoach',
  ShuttleFerryService = 'shuttleFerryService',
  ShuttleFlight = 'shuttleFlight',
  ShuttleTram = 'shuttleTram',
  SightseeingBus = 'sightseeingBus',
  SightseeingCoach = 'sightseeingCoach',
  SightseeingFlight = 'sightseeingFlight',
  SightseeingService = 'sightseeingService',
  SightseeingTram = 'sightseeingTram',
  SleeperRailService = 'sleeperRailService',
  SpecialCoach = 'specialCoach',
  SpecialNeedsBus = 'specialNeedsBus',
  SpecialTrain = 'specialTrain',
  StreetCableCar = 'streetCableCar',
  SuburbanRailway = 'suburbanRailway',
  Telecabin = 'telecabin',
  TelecabinLink = 'telecabinLink',
  TouristCoach = 'touristCoach',
  TouristRailway = 'touristRailway',
  TrainFerry = 'trainFerry',
  TrainTram = 'trainTram',
  Tube = 'tube',
  Undefined = 'undefined',
  UndefinedFunicular = 'undefinedFunicular',
  Unknown = 'unknown',
  UrbanRailway = 'urbanRailway',
  WaterTaxi = 'waterTaxi',
}

export enum TransportMode {
  Air = 'air',
  Bus = 'bus',
  Cableway = 'cableway',
  Coach = 'coach',
  Funicular = 'funicular',
  Lift = 'lift',
  Metro = 'metro',
  Monorail = 'monorail',
  Rail = 'rail',
  Tram = 'tram',
  Trolleybus = 'trolleybus',
  Unknown = 'unknown',
  Water = 'water',
}

export const TransportModeType = z.object({
  mode: z.nativeEnum(TransportMode),
  subMode: z.nativeEnum(TransportSubmode).optional(),
});

export const ZoneSelectionMode = z.union([
  z.literal('none'),
  z.literal('single'),
  z.literal('single-stop'),
  z.literal('single-zone'),
  z.literal('multiple'),
  z.literal('multiple-stop'),
  z.literal('multiple-zone'),
]);

export const TravellerSelectionMode = z.union([
  z.literal('multiple'),
  z.literal('single'),
  z.literal('none'),
]);

export const TimeSelectionMode = z.union([
  z.literal('datetime'),
  z.literal('next-morning'),
  z.literal('next-morning-minimum'),
  z.literal('none'),
]);

export const ProductSelectionMode = z.union([
  z.literal('duration'),
  z.literal('product'),
  z.literal('productAlias'),
  z.literal('none'),
]);

export const LanguageAndTextType = z.union([
  z.object({
    lang: z.string(),
    value: z.string(),
  }),
  z.object({
    language: z.string().optional(),
    value: z.string().optional(),
  }),
]);

export const FareProductTypeConfigSettings = z.object({
  zoneSelectionMode: ZoneSelectionMode,
  travellerSelectionMode: TravellerSelectionMode,
  timeSelectionMode: TimeSelectionMode,
  productSelectionMode: ProductSelectionMode,
  productSelectionTitle: z.array(LanguageAndTextType).optional(),
  requiresLogin: z.boolean(),
});

export const FareProductTypeConfig = z.object({
  type: z.string(),
  illustration: z.string(),
  name: z.array(LanguageAndTextType),
  transportModes: z.array(TransportModeType),
  excludedTariffZones: z.array(z.string()).optional(),
  description: z.array(LanguageAndTextType),
  configuration: FareProductTypeConfigSettings,
});

export type TransportModeType = z.infer<typeof TransportModeType>;
export type ZoneSelectionMode = z.infer<typeof ZoneSelectionMode>;
export type TravellerSelectionMode = z.infer<typeof TravellerSelectionMode>;
export type TimeSelectionMode = z.infer<typeof TimeSelectionMode>;
export type ProductSelectionMode = z.infer<typeof ProductSelectionMode>;
export type LanguageAndTextType = z.infer<typeof LanguageAndTextType>;
export type FareProductTypeConfigSettings = z.infer<
  typeof FareProductTypeConfigSettings
>;
export type FareProductTypeConfig = z.infer<typeof FareProductTypeConfig>;
