import { sensorTypeEnum } from "../enum/sensorType.enum";

export interface Reading {
    sensorId: number;
    timestamp: string;
    sensorType: sensorTypeEnum;
    sensorValue: number;
}