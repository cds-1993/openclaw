import { q_ as defineSetupPluginEntry } from "./pi-embedded-BTYL55uj.js";
import { a as imessageSetupAdapter } from "./setup-core-BZazlPv_.js";
import { r as imessageSetupWizard, t as createIMessagePluginBase } from "./shared-waPnQp7X.js";
//#region extensions/imessage/src/channel.setup.ts
const imessageSetupPlugin = { ...createIMessagePluginBase({
	setupWizard: imessageSetupWizard,
	setup: imessageSetupAdapter
}) };
//#endregion
//#region extensions/imessage/setup-entry.ts
var setup_entry_default = defineSetupPluginEntry(imessageSetupPlugin);
//#endregion
export { imessageSetupPlugin as n, setup_entry_default as t };
