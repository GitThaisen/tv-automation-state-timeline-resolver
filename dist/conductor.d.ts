/// <reference types="node" />
import { TimelineObject, TriggerType } from 'superfly-timeline';
import { Device } from './devices/device';
import { Mappings, DeviceOptions, TimelineResolvedObjectExtended } from './types/src';
import { EventEmitter } from 'events';
export interface TimelineContentObject extends TimelineObject {
}
export { TriggerType };
export declare type TimelineTriggerTimeResult = Array<{
    id: string;
    time: number;
}>;
export { Device } from './devices/device';
export interface ConductorOptions {
    initializeAsClear?: boolean;
    getCurrentTime?: () => number;
    autoInit?: boolean;
}
/**
 * The main class that serves to interface with all functionality.
 */
export declare class Conductor extends EventEmitter {
    private _logDebug;
    private _timeline;
    private _mapping;
    private _options;
    private devices;
    private _getCurrentTime?;
    private _nextResolveTime;
    private _resolveTimelineTrigger;
    private _isInitialized;
    private _doOnTime;
    private _queuedCallbacks;
    private _triggerSendStartStopCallbacksTimeout;
    private _sentCallbacks;
    constructor(options?: ConductorOptions);
    /**
     * Initialization, TODO, maybe do something here?
     */
    init(): Promise<void>;
    /**
     * Returns a nice, synchronized time.
     */
    getCurrentTime(): number;
    mapping: Mappings;
    timeline: Array<TimelineContentObject | TimelineResolvedObjectExtended>;
    logDebug: boolean;
    getDevices(): Array<Device>;
    getDevice(deviceId: string): Device;
    addDevice(deviceId: any, deviceOptions: DeviceOptions): Promise<Device>;
    removeDevice(deviceId: string): Promise<void>;
    destroy(): Promise<void>;
    /**
     * Resets the resolve-time, so that the resolving will happen for the point-in time NOW
     * next time
     */
    resetResolver(): void;
    /**
     * Send a makeReady-trigger to all devices
     */
    devicesMakeReady(okToDestroyStuff?: boolean): Promise<void>;
    /**
     * Send a standDown-trigger to all devices
     */
    devicesStandDown(okToDestroyStuff?: boolean): Promise<void>;
    /**
     * This is the main resolve-loop.
     */
    private _triggerResolveTimeline;
    /**
     * Resolves the timeline for the next resolve-time, generates the commands and passes on the commands.
     */
    private _resolveTimeline;
    private _fixNowObjects;
    private _queueCallback;
    private _triggerSendStartStopCallbacks;
    private _sendStartStopCallbacks;
}
