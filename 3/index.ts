import { sensorTypeEnum } from "../enum/sensorType.enum";
import { Reading } from "../interface/reading";

/**
 *  3a. Errors I found:
 *  
 *  Inside getMockReadings:
 *  --> function returns an array when the function signature asks to return a promise.
 *  --> Objects into dummy data array are not well defined. missing the property sensorId.
 * 
 *  Inside checkUpperThresholds:
 *  --> allSensorReadings needs to be initialised as an array
 *  --> Code doesn't wait for the promise to be resolved (or rejected) and execute the loop immediately with allSensorReadings as an empty array.
 * 
 */

const getMockReadings = async (): Promise<any> => {
    await new Promise(res => setTimeout(res, 50000));
    return [
        {
            id: 1,
            sensorType: 'air',
            sensorValue: 14,
            timestamp: '2023-08-20T12:52:48.775Z'
        },
        {
            id: 2,
            sensorType: 'humidity',
            sensorValue: 0.8,
            timestamp: '2023-08-22T12:52:48.775Z'
        },
        {
            id: 3,
            sensorType: 'temperature',
            sensorValue: 21,
            timestamp: '2023-08-23T12:52:48.775Z'
        }]
}

function checkUpperThresholds() {
    let allSensorReadings: any;
    getMockReadings().then(
        (readings: any) => {
            allSensorReadings = readings
        }
    )
    for (let i = 0; i < allSensorReadings.length; i++) {
        const reading = allSensorReadings[i];
        if (reading.sensorType == 'air' && reading.sensorValue > 12) {
            console.error("Air value has exceeded threshold");
        }
        if (reading.sensorType == 'humidity' && reading.sensorValue > 1) {
            console.error("Humidity value has excceded threshold");
        }
        if (reading.sensorType == 'temperature' && reading.sensorValue > 25) {
            console.error("Temperature value has excceded threshold");
        }
    }
}

/**
 * 3b. Fixes and improvements I did:
 * Inside getMockReadings:
 * --> function returns now a promise.
 * --> reading object has now the property sensorId instead of id.
 * --> Improvements: I reused interface and enum I created for the questions 1 and 2.
 * 
 * Inside checkUpperThresholds:
 * --> Used async/await to handle the asynchronous getMockReadings() function.
 * --> typing error fixed : excceded needs to be exceeded.
 * --> Updated the comparison operators from == to === for strict equality comparisons.
 * --> Improvements: I reused interface and enum I created for the questions 1 and 2.
 */


/**
 * Generates a list of mock readings with enhanced data.
 *
 * @return {Promise<Reading[]>} A promise that resolves to an array of Reading objects.
 */
const enhancedgetMockReadings = async (): Promise<Reading[]> => {
    return new Promise(resolve => {
        const readingsList: Reading[] = [
            {
                sensorId: 1,
                sensorType: sensorTypeEnum.air,
                sensorValue: 14,
                timestamp: '2023-08-20T12:52:48.775Z'
            },
            {
                sensorId: 2,
                sensorType: sensorTypeEnum.humidity,
                sensorValue: 2,
                timestamp: '2023-08-22T12:52:48.775Z'
            },
            {
                sensorId: 3,
                sensorType: sensorTypeEnum.temperature,
                sensorValue: 26,
                timestamp: '2023-08-23T12:52:48.775Z'
        }];
        setTimeout(() => resolve(readingsList), 500); 
    });
}

/**
 * Checks the sensor readings for any values that have exceeded their upper thresholds.
 *
 * @return {Promise<void>} This function does not return anything.
 */
async function fixedCheckUpperThresholds() {
    // 1. Get all sensor readings
    const allSensorReadings: Reading[] = await enhancedgetMockReadings();

    // 2. Loop through all sensor readings and check for errors 
    for (let i = 0; i < allSensorReadings.length; i++) {
        const reading = allSensorReadings[i];
        if (reading.sensorType === sensorTypeEnum.air && reading.sensorValue > 12) {
            console.error("Air value has exceeded threshold");
        }
        if (reading.sensorType === sensorTypeEnum.humidity && reading.sensorValue > 1) {
            console.error("Humidity value has excceded threshold");
        }
        if (reading.sensorType === sensorTypeEnum.temperature && reading.sensorValue > 25) {
            console.error("Temperature value has excceded threshold");
        }
    }
}

//Execution
fixedCheckUpperThresholds();