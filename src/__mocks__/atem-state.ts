export * from '../../node_modules/atem-state'
import { AtemConnection as OrigAtemConnection } from '../../node_modules/atem-state'
import { EventEmitter } from 'events'
import { plainToClass } from 'class-transformer'

function parseAudio (rawState: OrigAtemConnection.AudioState.AtemAudioState) {
	const state = plainToClass(OrigAtemConnection.AudioState.AtemAudioState, rawState)
	state.master = state.master
	state.channels = state.channels.map(ch => ch)

	return state
}

function parseVideo (rawState: OrigAtemConnection.VideoState.AtemVideoState) {
	return plainToClass(OrigAtemConnection.VideoState.AtemVideoState, {
		...rawState,
		ME: rawState.ME.map(me => plainToClass(OrigAtemConnection.VideoState.MixEffect, me)),
		superSources: rawState.superSources.map(ssrc => plainToClass(OrigAtemConnection.VideoState.SuperSource, ssrc))
	})
}

/** Note: This is incomplete, and should be filled in as needed */
function parseAtemState (rawState: any): OrigAtemConnection.AtemState {
	const state = plainToClass(OrigAtemConnection.AtemState, rawState)
	state.audio = parseAudio(state.audio)
	state.video = parseVideo(state.video)

	return state
}

const mockData = parseAtemState(require('./atem-out.json'))

let setTimeoutOrg = setTimeout

export namespace AtemConnection {
	// @ts-ignore separate declarations
	export class BasicAtem extends EventEmitter implements OrigAtemConnection.BasicAtem {
		constructor (_options?: OrigAtemConnection.AtemOptions) {
			super()
		}
		get state (): OrigAtemConnection.AtemState {
			return mockData
		}
		connect (): Promise<void> {
			setTimeoutOrg(() => {
				this.emit('connected', true)
			}, 10)

			return new Promise<void>((resolve) => {
				setTimeoutOrg(() => {
					resolve()
				}, 5)
			})
		}
		disconnect (): Promise<void> {
			return new Promise<void>((resolve) => {
				setTimeoutOrg(() => {
					resolve()
				}, 10)
			})
		}

		destroy (): Promise<void> {
			return new Promise<void>((resolve) => {
				setTimeoutOrg(() => {
					resolve()
				}, 10)
			})
		}

		sendCommand (): Promise<void> {
			return Promise.resolve()
		}
	}

}
