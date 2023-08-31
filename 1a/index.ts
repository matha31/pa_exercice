import { sensorTypeEnum } from "../enum/sensorType.enum";
import { Reading } from "../interface/reading";

/**
 * Returns an array of readings for a given sensor ID.
 *
 * @param {number} sensorId - The ID of the sensor.
 * @param {Reading[]} readings - The array of readings.
 * @return {Reading[]} - The filtered array of readings.
 */
export const getReadingsForSensorId = function (sensorId: number, readings: Reading[]): Reading[] { 
    return readings.filter((reading: Reading) => reading.sensorId === sensorId);
};

/**
 * Retrieves readings for a specific sensor from a list of readings.
 *
 * @param {number} sensorId - The ID of the sensor.
 * @param {Promise<Reading[]>} listPromise - A promise that resolves to a list of readings.
 * @return {Promise<Reading[]>} - A promise that resolves to an array of readings filtered by the sensor ID.
 */
export const enhancedGetReadingsForSensorId = async function (sensorId: number, listPromise: Promise<Reading[]>): Promise<Reading[]> {

    try {
        const readings = await listPromise;
        return readings.filter((reading: Reading) => reading.sensorId === sensorId);
    } catch (err:any) {
        throw new Error(err);
    }
};

// Execution
const sensorId = 1;
const readingsList = [
    {
        sensorId: 1,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.air,
        sensorValue: 5
    },
    {
        sensorId: 2,
        timestamp: '2023-08-20T12:52:46.442Z',
        sensorType: sensorTypeEnum.humidity,
        sensorValue: 2
    },
    {
        sensorId: 1,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.temperature,
        sensorValue: 5
    }
];

// 1A
console.log('1a');
const result = getReadingsForSensorId(sensorId, readingsList);
console.log(result);

// 1B
console.log('1b');
const promise = new Promise<Reading[]>((resolve, reject) => {
    resolve(readingsList);
    // reject('Impossible to get readings list');
});
const enhancedResult = enhancedGetReadingsForSensorId(sensorId, promise);
enhancedResult.then(result => console.log(result)).catch(err => { throw new Error(err)});