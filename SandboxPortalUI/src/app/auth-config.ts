import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from '../environments/environment';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signIn: environment.SIGNIN_POLICE_NAME
     },
     authorities: {
        signIn: {
             authority: environment.SIGNIN_AUTHORITY,
         }
     },
     authorityDomain: environment.AUTHORITY_DOMAIN
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: environment.CLIENT_ID,
         authority: b2cPolicies.authorities.signIn.authority,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: environment.LOGIN_REDIRECT_URI, 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  backendPortalApi: {
    endpoint: environment.BACKEND_PORTAL_API,
    scopes: [environment.BACKEND_PORTAL_API_SCOPES],
  },
}