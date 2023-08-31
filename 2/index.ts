import { sensorTypeEnum } from "../enum/sensorType.enum";
import { Reading } from "../interface/reading";

/**
 * Returns the latest reading from the given array of readings.
 *
 * @param {Reading[]} readings - An array of readings.
 * @return {Reading} The latest reading.
 */
const getLatestReading = function (readings: Reading[]): Reading {
    // 1. Sort readings by timestamp
    readings.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    return readings[0];
}

/**
 * Returns an array of unique sensor IDs from the given array of readings.
 *
 * @param {Reading[]} readings - An array of readings.
 * @return {number[]} An array of unique sensor IDs.
 */
const getUniqueSensorIds = function (readings: Reading[]): number[] {
    // 1. Get unique sensor IDs
    const sensorIds = readings.map((reading: Reading) => reading.sensorId);

    // 2. Remove duplicates
    return sensorIds.filter((item, index) => sensorIds.indexOf(item) === index);
}

/**
 * Retrieves the latest reading for each sensor ID from the given array of readings.
 *
 * @param {Reading[]} readings - An array of readings.
 * @return {Record<string, any>} An object containing the latest reading for each sensor ID.
 */
const getLatestReadingBySensorId = function (readings: Reading[]): Record<string,Reading> {
    let latestReadingObject: Record<string,Reading> = {};

    // 1. Get unique sensor IDs
    const sensorIds = getUniqueSensorIds(readings);
    
    // 2. Get latest reading for each sensor
    for (const sensorId of sensorIds) {
        latestReadingObject[sensorId] = getLatestReading(
            readings.filter((reading: Reading) => reading.sensorId === sensorId)
        );
    }
    return latestReadingObject;
}

// Execution
const readingsList = [
    {
        sensorId: 1,
        timestamp: '2023-08-20T14:50:48.775Z',
        sensorType: sensorTypeEnum.air,
        sensorValue: 5
    },
    {
        sensorId: 2,
        timestamp: '2023-08-21T12:51:46.442Z',
        sensorType: sensorTypeEnum.humidity,
        sensorValue: 2
    },
    {
        sensorId: 1,
        timestamp: '2023-08-28T12:52:48.775Z',
        sensorType: sensorTypeEnum.temperature,
        sensorValue: 6
    },
    {
        sensorId: 6,
        timestamp: '2023-07-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.temperature,
        sensorValue: 6
    }
];
// 2
console.log('2');
const result = getLatestReadingBySensorId(readingsList);
console.log(result);