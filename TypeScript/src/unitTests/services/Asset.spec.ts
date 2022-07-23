/* eslint-disable no-undef */
import { Repository } from 'typeorm';
import Asset from '../../entities/Asset';
import AssetService from '../../services/AssetService';
import AssetMocks from './mocks/Asset.mock';

describe('AssetService with mocked repository', () => {
  it('the getAssets method returns the correct array', async () => {
    const { findAndCount, getAssetsExpectedResult } = AssetMocks;

    const AssetRepositoryMock = {
      findAndCount: () => findAndCount,
    } as unknown as Repository<Asset>;

    const AssetServiceMock = new AssetService(AssetRepositoryMock);

    const result = await AssetServiceMock.getAssets();
    expect(result).toEqual(getAssetsExpectedResult);
  });
});
