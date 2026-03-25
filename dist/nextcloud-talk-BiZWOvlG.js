import { K_ as defineChannelPluginEntry } from "./pi-embedded-BTYL55uj.js";
import { n as setNextcloudTalkRuntime, t as nextcloudTalkPlugin } from "./channel-B5Qey6e8.js";
//#region extensions/nextcloud-talk/index.ts
var nextcloud_talk_default = defineChannelPluginEntry({
	id: "nextcloud-talk",
	name: "Nextcloud Talk",
	description: "Nextcloud Talk channel plugin",
	plugin: nextcloudTalkPlugin,
	setRuntime: setNextcloudTalkRuntime
});
//#endregion
export { nextcloud_talk_default as t };
