import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        // onViewTransitionCreated(transitionInfo) {
        //   console.log(
        //     "🚀 ~ onViewTransitionCreated ~ transitionInfo:",
        //     transitionInfo
        //   );
        // },
      })
    ),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),
    // importProvidersFrom(HttpClientModule),
  ],
};
