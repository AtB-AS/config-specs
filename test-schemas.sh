
#atb prod
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/atb-mobility-platform/fareProductTypeConfigs.yaml
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/atb-mobility-platform/other.yaml
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/atb-mobility-platform/mobility.yaml
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/atb-mobility-platform/paymentTypes.yaml
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/atb-mobility-platform/travelSearchFilters.yaml
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/atb-mobility-platform/urls.yaml
node ./lib/tools/bin.js -s harborConnectionOverrides -f ../firestore-configuration/documents/atb-mobility-platform/harborConnectionOverrides.yaml
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/atb-mobility-platform/notificationConfig.yaml
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/atb-mobility-platform/consents.yaml
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/atb-mobility-platform/referenceData.json
node ./lib/tools/bin.js -s stopSignalButtonConfig -f ../firestore-configuration/documents/atb-mobility-platform/stopSignalButtonConfig.yaml

#atb staging
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/atb-mobility-platform-staging/fareProductTypeConfigs.yaml
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/atb-mobility-platform-staging/other.yaml
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/atb-mobility-platform-staging/mobility.yaml
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/atb-mobility-platform-staging/paymentTypes.yaml
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/atb-mobility-platform-staging/travelSearchFilters.yaml
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/atb-mobility-platform-staging/urls.yaml
node ./lib/tools/bin.js -s harborConnectionOverrides -f ../firestore-configuration/documents/atb-mobility-platform-staging/harborConnectionOverrides.yaml
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/atb-mobility-platform-staging/notificationConfig.yaml
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/atb-mobility-platform-staging/consents.yaml
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/atb-mobility-platform-staging/referenceData.json
node ./lib/tools/bin.js -s stopSignalButtonConfig -f ../firestore-configuration/documents/atb-mobility-platform-staging/stopSignalButtonConfig.yaml

#farte-prod
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/farte-prod/other.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/farte-prod/referenceData.json 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/farte-prod/travelSearchFilters.yaml

# farte-staging
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/farte-staging/other.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/farte-staging/referenceData.json 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/farte-staging/travelSearchFilters.yaml

# fram-prod-a7850
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/fram-prod-a7850/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/fram-prod-a7850/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/fram-prod-a7850/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/fram-prod-a7850/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/fram-prod-a7850/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/fram-prod-a7850/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/fram-prod-a7850/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/fram-prod-a7850/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/fram-prod-a7850/urls.yaml

# fram-staging
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/fram-staging/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/fram-staging/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/fram-staging/mobility.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/fram-staging/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/fram-staging/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/fram-staging/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/fram-staging/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/fram-staging/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/fram-staging/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/fram-staging/urls.yaml

# innlandet-staging
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/innlandet-staging/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/innlandet-staging/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/innlandet-staging/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/innlandet-staging/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/innlandet-staging/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/innlandet-staging/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/innlandet-staging/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/innlandet-staging/urls.yaml

# nfk-prod
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/nfk-prod/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/nfk-prod/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s feedbackQuestions -f ../firestore-configuration/documents/nfk-prod/feedbackQuestions.json 
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/nfk-prod/mobility.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/nfk-prod/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/nfk-prod/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/nfk-prod/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/nfk-prod/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/nfk-prod/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/nfk-prod/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/nfk-prod/urls.yaml

# nfk-staging
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/nfk-staging/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/nfk-staging/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s feedbackQuestions -f ../firestore-configuration/documents/nfk-staging/feedbackQuestions.json 
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/nfk-staging/mobility.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/nfk-staging/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/nfk-staging/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/nfk-staging/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/nfk-staging/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/nfk-staging/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/nfk-staging/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/nfk-staging/urls.yaml

# troms-prod
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/troms-prod/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/troms-prod/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s harborConnectionOverrides -f ../firestore-configuration/documents/troms-prod/harborConnectionOverrides.yaml 
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/troms-prod/mobility.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/troms-prod/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/troms-prod/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/troms-prod/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/troms-prod/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/troms-prod/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/troms-prod/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/troms-prod/urls.yaml

# troms-staging
node ./lib/tools/bin.js -s consents -f ../firestore-configuration/documents/troms-staging/consents.yaml 
node ./lib/tools/bin.js -s fareProductTypeConfigs -f ../firestore-configuration/documents/troms-staging/fareProductTypeConfigs.yaml 
node ./lib/tools/bin.js -s harborConnectionOverrides -f ../firestore-configuration/documents/troms-staging/harborConnectionOverrides.yaml 
node ./lib/tools/bin.js -s mobility -f ../firestore-configuration/documents/troms-staging/mobility.yaml 
node ./lib/tools/bin.js -s notificationConfig -f ../firestore-configuration/documents/troms-staging/notificationConfig.yaml 
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/troms-staging/other.yaml 
node ./lib/tools/bin.js -s paymentTypes -f ../firestore-configuration/documents/troms-staging/paymentTypes.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/troms-staging/referenceData.json 
# node ./lib/tools/bin.js -s schedules -f ../firestore-configuration/documents/troms-staging/schedules.yaml 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/troms-staging/travelSearchFilters.yaml 
node ./lib/tools/bin.js -s urls -f ../firestore-configuration/documents/troms-staging/urls.yaml

# vkt-prod
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/vkt-prod/other.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/vkt-prod/referenceData.json 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/vkt-prod/travelSearchFilters.yaml

#vkt-staging
node ./lib/tools/bin.js -s other -f ../firestore-configuration/documents/vkt-staging/other.yaml 
node ./lib/tools/bin.js -s referenceData -f ../firestore-configuration/documents/vkt-staging/referenceData.json 
node ./lib/tools/bin.js -s travelSearchFilters -f ../firestore-configuration/documents/vkt-staging/travelSearchFilters.yaml
