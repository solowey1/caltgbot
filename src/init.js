import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug) {
  $debug.set(debug);
  initSDK();

  // Mount
  if (backButton.mount.isAvailable()) {
    backButton.mount();
  }
  if (miniApp.mount.isAvailable()) {
    miniApp.mount();
  }
  if (themeParams.mount.isAvailable()) {
    themeParams.mount();
  }
  initData.restore();
  if (viewport.mount.isAvailable()) {
    viewport.mount();
  }

  // Advanced
  if (viewport.isMounted()) {
    viewport.bindCssVars();
  }
  if (miniApp.isMounted()) {
    miniApp.bindCssVars();
  }
  if (themeParams.isMounted()) {
    themeParams.bindCssVars();
  }

  // Add Eruda if needed.
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);
}
