/* eslint-disable no-undef */
import { Repository } from 'typeorm';
import Asset from '../../entities/Asset';
import AssetService from '../../services/AssetService';
import AssetMocks from './mocks/Asset.mock';

describe('AssetService with mocked repository', () => {
  const { findAndCount, getAssetsExpectedResult, findOne } = AssetMocks;

  describe('Without error', () => {
    const AssetRepositoryMock = {
      findAndCount: () => findAndCount,
      findOne: () => findOne,
    } as unknown as Repository<Asset>;
    const AssetServiceMock = new AssetService(AssetRepositoryMock);

    it('the getAssets method returns the correct array', async () => {
      const result = await AssetServiceMock.getAssets();
      expect(result).toEqual(getAssetsExpectedResult);
    });

    it('the getAssetById method returns the correct Asset', async () => {
      const result = await AssetServiceMock.getAssetById(1);
      expect(result).toEqual(findOne);
    });
  });

  describe('With error', () => {
    const AssetRepositoryMock = {
      findOne: () => null,
    } as unknown as Repository<Asset>;
    const AssetServiceMock = new AssetService(AssetRepositoryMock);

    it('the getAssetById method returns an Error with a correct message and status code 404 when db returns null', () => {
      expect(AssetServiceMock.getAssetById(1)).rejects.toThrow('Ativo não encontrado');
      expect(AssetServiceMock.getAssetById(1)).rejects.toHaveProperty('status', 404);
    });
  });
});
