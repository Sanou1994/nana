// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const commonAppURI: string = 'http://localhost:8081/';

export const environment = {
  production: false,
  categorieResource: commonAppURI + 'categories',
  logicielResource: commonAppURI + 'logiciels',
  editeurResource: commonAppURI + 'editeurs',
  telechargementResource: commonAppURI + 'telechargement',
  versionResource: commonAppURI + 'versions',
  compatibiliteOSResource: commonAppURI + 'compatibiliteOS',
  utiliteLogicielResource: commonAppURI + 'utiliteLogiciel',
  authResource: commonAppURI + 'auth',
  utilisateurResource: commonAppURI + 'utilisateur',
  profileResource: commonAppURI + 'profile',
  privilegeResource: commonAppURI + 'privileges',
  recordsPerPage: 10,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
