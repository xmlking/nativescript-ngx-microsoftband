
declare class AccelerometerData extends SensorData {

	static alloc(): AccelerometerData; // inherited from NSObject

	static new(): AccelerometerData; // inherited from NSObject

	readonly x: number;

	readonly y: number;

	readonly z: number;

	constructor(o: { x: number; y: number; z: number; });

	initWithXYZ(x: number, y: number, z: number): this;
}

declare class AltimeterData extends SensorData {

	static alloc(): AltimeterData; // inherited from NSObject

	static new(): AltimeterData; // inherited from NSObject

	readonly flightsAscended: number;

	readonly flightsAscendedToday: number;

	readonly flightsDescended: number;

	readonly rate: number;

	readonly steppingGain: number;

	readonly steppingLoss: number;

	readonly stepsAscended: number;

	readonly stepsDescended: number;

	readonly totalGain: number;

	readonly totalGainToday: number;

	readonly totalLoss: number;

	constructor(o: { totalGain: number; totalGainToday: number; totalLoss: number; steppingGain: number; steppingLoss: number; stepsAscended: number; stepsDescended: number; rate: number; flightsAscended: number; flightsAscendedToday: number; flightsDescended: number; });

	initWithTotalGainTotalGainTodayTotalLossSteppingGainSteppingLossStepsAscendedStepsDescendedRateFlightsAscendedFlightsAscendedTodayFlightsDescended(totalGain: number, totalGainToday: number, totalLoss: number, steppingGain: number, steppingLoss: number, stepsAscended: number, stepsDescended: number, rate: number, flightsAscended: number, flightsAscendedToday: number, flightsDescended: number): this;
}

declare class AmbientLightData extends SensorData {

	static alloc(): AmbientLightData; // inherited from NSObject

	static new(): AmbientLightData; // inherited from NSObject

	readonly brightness: number;

	constructor(o: { brightness: number; });

	initWithBrightness(brightness: number): this;
}

declare class BarometerData extends SensorData {

	static alloc(): BarometerData; // inherited from NSObject

	static new(): BarometerData; // inherited from NSObject

	readonly airPressure: number;

	readonly temperature: number;

	constructor(o: { temperature: number; airPressure: number; });

	initWithTemperatureAirPressure(temperature: number, airPressure: number): this;
}

declare class CaloriesData extends SensorData {

	static alloc(): CaloriesData; // inherited from NSObject

	static new(): CaloriesData; // inherited from NSObject

	readonly calories: number;

	readonly caloriesToday: number;

	constructor(o: { calories: number; caloriesToday: number; });

	initWithCaloriesCaloriesToday(calories: number, caloriesToday: number): this;
}

interface ConnectionDelegate {

	onConnecte?(): void;

	onDisconnecte?(): void;

	onErrorWithError?(error: NSError): void;
}
declare var ConnectionDelegate: {

	prototype: ConnectionDelegate;
};

declare const enum ConnectionError {

	BluetoothUnavailable = 0,

	DeviceUnavailable = 1
}

declare const enum ConnectionStatus {

	Connected = 0,

	Disconnected = 1
}

declare class ContactData extends SensorData {

	static alloc(): ContactData; // inherited from NSObject

	static new(): ContactData; // inherited from NSObject

	readonly wornState: WornState;

	constructor(o: { wornState: WornState; });

	initWithWornState(wornState: WornState): this;
}

declare class DistanceData extends SensorData {

	static alloc(): DistanceData; // inherited from NSObject

	static new(): DistanceData; // inherited from NSObject

	readonly distanceToday: number;

	readonly motionType: MotionType;

	readonly pace: number;

	readonly speed: number;

	readonly totalDistance: number;

	constructor(o: { totalDistance: number; distanceToday: number; speed: number; pace: number; motionType: MotionType; });

	initWithTotalDistanceDistanceTodaySpeedPaceMotionType(totalDistance: number, distanceToday: number, speed: number, pace: number, motionType: MotionType): this;
}

declare class GSRData extends SensorData {

	static alloc(): GSRData; // inherited from NSObject

	static new(): GSRData; // inherited from NSObject

	readonly resistance: number;

	constructor(o: { resistance: number; });

	initWithResistance(resistance: number): this;
}

declare class GyroscopeData extends SensorData {

	static alloc(): GyroscopeData; // inherited from NSObject

	static new(): GyroscopeData; // inherited from NSObject

	readonly x: number;

	readonly y: number;

	readonly z: number;

	constructor(o: { x: number; y: number; z: number; });

	initWithXYZ(x: number, y: number, z: number): this;
}

declare class HeartRateData extends SensorData {

	static alloc(): HeartRateData; // inherited from NSObject

	static new(): HeartRateData; // inherited from NSObject

	readonly heartRate: number;

	readonly quality: Quality;

	constructor(o: { heartRate: number; quality: Quality; });

	initWithHeartRateQuality(heartRate: number, quality: Quality): this;
}

declare class HumidityData extends SensorData {

	static alloc(): HumidityData; // inherited from NSObject

	static new(): HumidityData; // inherited from NSObject

	readonly humidity: number;

	constructor(o: { humidity: number; });

	initWithHumidity(humidity: number): this;
}

declare const enum IndexLevel {

	None = 0,

	Low = 1,

	Medium = 2,

	High = 3,

	VeryHigh = 4
}

declare class MagnetometerData extends SensorData {

	static alloc(): MagnetometerData; // inherited from NSObject

	static new(): MagnetometerData; // inherited from NSObject

	readonly x: number;

	readonly y: number;

	readonly z: number;

	constructor(o: { x: number; y: number; z: number; });

	initWithXYZ(x: number, y: number, z: number): this;
}

declare class MicrosoftBand extends NSObject implements  Peripheral {

	static alloc(): MicrosoftBand; // inherited from NSObject

	static new(): MicrosoftBand; // inherited from NSObject

	connectDelegate: ConnectionDelegate;

	readonly isDeviceConnected: boolean;

	readonly userConsent: UserConsent;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly deviceIdentifier: NSUUID; // inherited from Peripheral

	readonly firmwareVersion: string; // inherited from Peripheral

	readonly hardwareVersion: string; // inherited from Peripheral

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly name: string; // inherited from Peripheral

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	addTileWithTileIdTileNameTileIconSmallIconCompletion(tileId: NSUUID, tileName: string, tileIcon: string, smallIcon: string, completion: (p1: NSError) => void): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	connectAndReturnError(): boolean;

	disconnect(): void;

	isBluetoothOn(): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestUserConsentWithUserConsent(userConsent: (p1: boolean) => void): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	sendBandNotificationWithTileIdTitleBodyCompletion(tileId: NSUUID, title: string, body: string, completion: (p1: NSError) => void): void;

	sendHapticWithCompletion(completion: (p1: NSError) => void): void;

	startAccelerometerUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: AccelerometerData, p2: NSError) => void): boolean;

	startAltimeterUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: AltimeterData, p2: NSError) => void): boolean;

	startAmbientLightUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: AmbientLightData, p2: NSError) => void): boolean;

	startBandContactUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: ContactData, p2: NSError) => void): boolean;

	startBarometerUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: BarometerData, p2: NSError) => void): boolean;

	startCaloriesUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: CaloriesData, p2: NSError) => void): boolean;

	startDistanceUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: DistanceData, p2: NSError) => void): boolean;

	startGSRUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: GSRData, p2: NSError) => void): boolean;

	startGyroscopeUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: GyroscopeData, p2: NSError) => void): boolean;

	startHeartRateUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: HeartRateData, p2: NSError) => void): boolean;

	startPedometerUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: PedometerData, p2: NSError) => void): boolean;

	startRRIntervalUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: RRIntervalData, p2: NSError) => void): boolean;

	startSkinTempUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: SkinTemperatureData, p2: NSError) => void): boolean;

	startUVUpdatesAndReturnErrorCompletion(error: interop.Pointer | interop.Reference<NSError>, completion: (p1: UVData, p2: NSError) => void): boolean;

	stopAccelerometerUpdatesAndReturnError(): boolean;

	stopAltimeterUpdatesAndReturnError(): boolean;

	stopAmbientLightUpdatesAndReturnError(): boolean;

	stopBandContactUpdatesAndReturnError(): boolean;

	stopBarometerUpdatesAndReturnError(): boolean;

	stopCaloriesUpdatesAndReturnError(): boolean;

	stopDistanceUpdatesAndReturnError(): boolean;

	stopGSRUpdatesAndReturnError(): boolean;

	stopGyroscopeUpdatesAndReturnError(): boolean;

	stopHeartRateUpdatesAndReturnError(): boolean;

	stopPedometerUpdatesAndReturnError(): boolean;

	stopRRIntervalUpdatesAndReturnError(): boolean;

	stopSkinTempUpdatesAndReturnError(): boolean;

	stopUVUpdatesAndReturnError(): boolean;
}

declare var MicrosoftBandVersionNumber: number;

declare var MicrosoftBandVersionNumberVar: number;

declare var MicrosoftBandVersionString: interop.Reference<number>;

declare var MicrosoftBandVersionStringVar: interop.Reference<number>;

declare const enum MotionType {

	Unknown = 0,

	Idle = 1,

	Walking = 2,

	Jogging = 3,

	Running = 4
}

declare class PedometerData extends SensorData {

	static alloc(): PedometerData; // inherited from NSObject

	static new(): PedometerData; // inherited from NSObject

	readonly stepsToday: number;

	readonly totalSteps: number;

	constructor(o: { totalSteps: number; stepsToday: number; });

	initWithTotalStepsStepsToday(totalSteps: number, stepsToday: number): this;
}

interface Peripheral {

	deviceIdentifier: NSUUID;

	firmwareVersion: string;

	hardwareVersion: string;

	name: string;

	connectAndReturnError(): boolean;

	disconnect(): void;
}
declare var Peripheral: {

	prototype: Peripheral;
};

declare const enum Quality {

	Acquiring = 0,

	Locked = 1
}

declare class RRIntervalData extends SensorData {

	static alloc(): RRIntervalData; // inherited from NSObject

	static new(): RRIntervalData; // inherited from NSObject

	readonly interval: number;

	constructor(o: { interval: number; });

	initWithInterval(interval: number): this;
}

declare class SensorData extends NSObject {

	static alloc(): SensorData; // inherited from NSObject

	static new(): SensorData; // inherited from NSObject

	readonly timestamp: number;

	readonly type: SensorType;

	constructor(o: { type: SensorType; });

	initWithType(type: SensorType): this;
}

declare const enum SensorType {

	Accelerometer = 0,

	SkinTemperature = 1,

	Humidity = 2,

	Magnetometer = 3,

	Gyroscope = 4,

	Altimeter = 5,

	Barometer = 6,

	AmbientLight = 7,

	Calories = 8,

	GSR = 9,

	Pedometer = 10,

	HeartRate = 11,

	RRInterval = 12,

	UV = 13,

	Contact = 14,

	Distance = 15
}

declare class SkinTemperatureData extends SensorData {

	static alloc(): SkinTemperatureData; // inherited from NSObject

	static new(): SkinTemperatureData; // inherited from NSObject

	readonly temperature: number;

	constructor(o: { temperature: number; });

	initWithTemperature(temperature: number): this;
}

declare class UVData extends SensorData {

	static alloc(): UVData; // inherited from NSObject

	static new(): UVData; // inherited from NSObject

	readonly exposureToday: number;

	readonly uvIndexLevel: IndexLevel;

	constructor(o: { exposureToday: number; uvIndexLevel: IndexLevel; });

	initWithExposureTodayUvIndexLevel(exposureToday: number, uvIndexLevel: IndexLevel): this;
}

declare const enum UserConsent {

	NotSpecified = 0,

	Granted = 1,

	Declined = 2
}

declare const enum WornState {

	NotWorn = 0,

	Worn = 1,

	Unknown = 2
}
