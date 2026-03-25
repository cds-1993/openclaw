import { q_ as defineSetupPluginEntry } from "./pi-embedded-BTYL55uj.js";
import { r as discordSetupAdapter } from "./setup-core-DNOtjAI3.js";
import { t as createDiscordPluginBase } from "./shared-CEe5A_FU.js";
//#region extensions/discord/src/channel.setup.ts
const discordSetupPlugin = { ...createDiscordPluginBase({ setup: discordSetupAdapter }) };
//#endregion
//#region extensions/discord/setup-entry.ts
var setup_entry_default = defineSetupPluginEntry(discordSetupPlugin);
//#endregion
export { discordSetupPlugin as n, setup_entry_default as t };
