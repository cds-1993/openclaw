import { n as DiscordConfigSchema } from "./zod-schema.providers-core-COy5nBQ0.js";
import { r as getChatChannelMeta } from "./registry-C5UkPpaO.js";
import { Q_ as adaptScopedAccountAccessor, Qy as listDiscordAccountIds, W_ as createChannelPluginBase, Xy as inspectDiscordAccount, j_ as formatAllowFromLowercase, nb as resolveDiscordAccount, nv as createScopedChannelConfigAdapter, tb as resolveDefaultDiscordAccountId } from "./pi-embedded-BTYL55uj.js";
import { n as describeAccountSnapshot } from "./account-helpers-BiC682rw.js";
import { r as buildChannelConfigSchema } from "./config-schema-CKb8N9O1.js";
import { n as createDiscordSetupWizardProxy } from "./setup-core-DNOtjAI3.js";
//#region extensions/discord/src/shared.ts
const DISCORD_CHANNEL = "discord";
async function loadDiscordChannelRuntime() {
	return await import("./channel.runtime-qrfxDRyX.js");
}
const discordSetupWizard = createDiscordSetupWizardProxy(async () => (await loadDiscordChannelRuntime()).discordSetupWizard);
const discordConfigAdapter = createScopedChannelConfigAdapter({
	sectionKey: DISCORD_CHANNEL,
	listAccountIds: listDiscordAccountIds,
	resolveAccount: adaptScopedAccountAccessor(resolveDiscordAccount),
	inspectAccount: adaptScopedAccountAccessor(inspectDiscordAccount),
	defaultAccountId: resolveDefaultDiscordAccountId,
	clearBaseFields: ["token", "name"],
	resolveAllowFrom: (account) => account.config.dm?.allowFrom,
	formatAllowFrom: (allowFrom) => formatAllowFromLowercase({ allowFrom }),
	resolveDefaultTo: (account) => account.config.defaultTo
});
function createDiscordPluginBase(params) {
	return createChannelPluginBase({
		id: DISCORD_CHANNEL,
		setupWizard: discordSetupWizard,
		meta: { ...getChatChannelMeta(DISCORD_CHANNEL) },
		capabilities: {
			chatTypes: [
				"direct",
				"channel",
				"thread"
			],
			polls: true,
			reactions: true,
			threads: true,
			media: true,
			nativeCommands: true
		},
		streaming: { blockStreamingCoalesceDefaults: {
			minChars: 1500,
			idleMs: 1e3
		} },
		reload: { configPrefixes: ["channels.discord"] },
		configSchema: buildChannelConfigSchema(DiscordConfigSchema),
		config: {
			...discordConfigAdapter,
			isConfigured: (account) => Boolean(account.token?.trim()),
			describeAccount: (account) => describeAccountSnapshot({
				account,
				configured: Boolean(account.token?.trim()),
				extra: { tokenSource: account.tokenSource }
			})
		},
		setup: params.setup
	});
}
//#endregion
export { discordConfigAdapter as n, createDiscordPluginBase as t };
