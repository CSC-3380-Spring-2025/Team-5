/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/albumly`; params?: Router.UnknownInputParams; } | { pathname: `/artistly`; params?: Router.UnknownInputParams; } | { pathname: `/games`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/search`; params?: Router.UnknownInputParams; } | { pathname: `/songly`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/albumly`; params?: Router.UnknownOutputParams; } | { pathname: `/artistly`; params?: Router.UnknownOutputParams; } | { pathname: `/games`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/search`; params?: Router.UnknownOutputParams; } | { pathname: `/songly`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/albumly${`?${string}` | `#${string}` | ''}` | `/artistly${`?${string}` | `#${string}` | ''}` | `/games${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/search${`?${string}` | `#${string}` | ''}` | `/songly${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/albumly`; params?: Router.UnknownInputParams; } | { pathname: `/artistly`; params?: Router.UnknownInputParams; } | { pathname: `/games`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/search`; params?: Router.UnknownInputParams; } | { pathname: `/songly`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
