import "./logger-kwZIqwuw.js";
import "./paths-ViKUYWUK.js";
import "./tmp-openclaw-dir-idKIOMmb.js";
import "./theme-CdOoMzRk.js";
import "./globals-DBUMOBZ8.js";
import "./ansi-BEJF8NKS.js";
import "./utils-CS0Ikux6.js";
import "./links-8xRhWBQL.js";
import { n as VERSION } from "./version-CD3oP1-d.js";
import { t as getCoreCliCommandDescriptors } from "./core-command-descriptors-CutYWtKK.js";
import { n as getSubCliEntries } from "./subcli-descriptors-DXSCqHak.js";
import "./banner-Be9UXpWc.js";
import { t as configureProgramHelp } from "./help-0GjXp0nY.js";
import { Command } from "commander";
//#region src/cli/program/root-help.ts
function buildRootHelpProgram() {
	const program = new Command();
	configureProgramHelp(program, {
		programVersion: VERSION,
		channelOptions: [],
		messageChannelOptions: "",
		agentChannelOptions: ""
	});
	for (const command of getCoreCliCommandDescriptors()) program.command(command.name).description(command.description);
	for (const command of getSubCliEntries()) program.command(command.name).description(command.description);
	return program;
}
function outputRootHelp() {
	buildRootHelpProgram().outputHelp();
}
//#endregion
export { outputRootHelp };
