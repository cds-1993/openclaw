import { Ni as lineSetupWizard, Pi as lineSetupAdapter, q_ as defineSetupPluginEntry } from "./pi-embedded-BTYL55uj.js";
import { t as lineChannelPluginCommon } from "./channel-shared-KZ5mefb5.js";
//#region extensions/line/src/channel.setup.ts
const lineSetupPlugin = {
	id: "line",
	...lineChannelPluginCommon,
	setupWizard: lineSetupWizard,
	setup: lineSetupAdapter
};
//#endregion
//#region extensions/line/setup-entry.ts
var setup_entry_default = defineSetupPluginEntry(lineSetupPlugin);
//#endregion
export { lineSetupPlugin as n, setup_entry_default as t };
