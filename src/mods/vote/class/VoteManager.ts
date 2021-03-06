import { BaseManager } from "../../../core/manager/BaseManager";
import { SucklessBot } from "../../../core/SucklessBot";
import { Vote } from "./Vote";

/**
 * A Vote session manager
 *
 * @class VoteManager
 */
export class VoteManager extends BaseManager {
	/**
	 * Vote sessions for this manager
	 *
	 * @private
	 * @type {Vote[]}
	 * @memberof VoteManager
	 */
	private __sessions: Vote[] = [];

	/**
	 * Creates an instance of VoteManager.
	 *
	 * @param {SucklessBot} [bot] The SucklessBot instance this manager belongs to
	 * @memberof VoteManager
	 */
	constructor(bot?: SucklessBot) {
		super(bot);
	}

	/**
	 * Add a vote session to this manager
	 *
	 * @param {Vote} session
	 * @returns {*}
	 * @memberof VoteManager
	 */
	public add(session: Vote): void {
		this.__sessions.push(session);

		// debug
		this.__bot?.emit("debug", `[VoteManager] Added Vote #${session.id} to the list`);
	}

	/**
	 * Remove a vote session from this manager
	 *
	 * @param {Vote} session
	 * @returns {*}
	 * @memberof VoteManager
	 */
	public remove(session: Vote): void {
		this.__sessions.splice(this.__sessions.indexOf(session), 1);

		// debug
		this.__bot?.emit("debug", `[VoteManager] Removed Vote #${session.id} from the list`);
	}

	/**
	 * Get on or all vote sessions from this manager
	 *
	 * @param {string} [id]
	 * @return {*}  {Vote[]}
	 * @memberof VoteManager
	 */
	public getSession(id?: string): Vote[] {
		return id ? [this.__sessions.find((session) => session.id.includes(id))] : this.__sessions;
	}
}
