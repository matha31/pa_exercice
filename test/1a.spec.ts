import { sensorTypeEnum } from '../enum/sensorType.enum';
import { Reading } from '../interface/reading';
import { getReadingsForSensorId } from '../1a/index';
import { expect } from 'chai';

describe('getReadingsForSensorId', () => {
  it('should return an empty array if there are no readings', () => {
    const readings: Reading[] = [];
    const sensorId = 1;

    const result = getReadingsForSensorId(sensorId, readings);

    expect(result).to.eql([]);
  });

  it('should return an empty array if there are no readings for the given sensor ID', () => {
    const readings: Reading[] = [
      {
        sensorId: 10,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.air,
        sensorValue: 5
      },
      {
        sensorId: 10,
        timestamp: '2023-08-20T12:52:46.442Z',
        sensorType: sensorTypeEnum.humidity,
        sensorValue: 2
      },
      {
        sensorId: 10,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.temperature,
        sensorValue: 5
      }
    ];
    const sensorId = 1;

    const result = getReadingsForSensorId(sensorId, readings);
    expect(result).to.eql([]);
  });

  it('should return an array of readings for the given sensor ID', () => {
    const readings: Reading[] = [
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
    const sensorId = 1;

    const result = getReadingsForSensorId(sensorId, readings);

    expect(result).to.eql([
      {
        sensorId: 1,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.air,
        sensorValue: 5
      },
      {
        sensorId: 1,
        timestamp: '2023-08-20T12:52:48.775Z',
        sensorType: sensorTypeEnum.temperature,
        sensorValue: 5
      }
    ]);
  });
});