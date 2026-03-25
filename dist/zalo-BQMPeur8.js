import { K_ as defineChannelPluginEntry } from "./pi-embedded-BTYL55uj.js";
import { t as zaloPlugin } from "./channel-CtIx0YT9.js";
import { n as setZaloRuntime } from "./runtime-DWPn5G0s.js";
//#region extensions/zalo/index.ts
var zalo_default = defineChannelPluginEntry({
	id: "zalo",
	name: "Zalo",
	description: "Zalo channel plugin",
	plugin: zaloPlugin,
	setRuntime: setZaloRuntime
});
//#endregion
export { zalo_default as t };
