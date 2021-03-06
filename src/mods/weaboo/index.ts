import * as Discord from "discord.js";
import { SucklessBot } from "../../core/SucklessBot";
import { __all, __random } from "./Functions";

/**
 * Send an anime pic, from nekos.life and nekos.fun
 *
 * @param {Message} message
 * @param {string[]} args
 * @param {SucklessBot} bot
 * @return {*}
 */
export async function SendImg(message: Discord.Message, args: string[]): Promise<any> {
	const tag = args && args.length > 0 ? args.join() : undefined;

	if (!args) {
		return;
	} else if (tag?.toLowerCase().match(/list/)) {
		// if list was given, send available tags
		return message.reply(`**Available tags:** ${__all.join(", ")}`);
	}

	// get a random image
	return __random(tag).then((img) =>
		img
			? message.channel.send({
					embeds: [
						new Discord.MessageEmbed()
							.setTitle(`Here ya go`)
							.setImage(img)
							.setAuthor(message.author.tag)
							.setTimestamp(),
					],
			  })
			: message.reply(`I couldn't find any image with the tag **${tag}**`)
	);
}
