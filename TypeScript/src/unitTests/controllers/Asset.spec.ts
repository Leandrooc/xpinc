/* eslint-disable no-undef */
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AssetController from '../../controllers/AssetController';
import Asset from '../../entities/Asset';
import AssetService from '../../services/AssetService';
import AssetMocks from '../mocks/Asset.mock';

let request = {} as Request;
const response = {} as Response;

describe('AssetController with mocked repository', () => {
  const { findAndCount, findOne, getAssetsExpectedResult } = AssetMocks;

  const AssetRepositoryMock = {
    findAndCount: () => findAndCount,
    findOne: () => findOne,
  } as unknown as Repository<Asset>;
  const AssetServiceMock = new AssetService(AssetRepositoryMock);
  const assetController = new AssetController(AssetServiceMock);

  response.json = jest.fn().mockReturnValue(response);
  response.status = jest.fn().mockReturnValue(response);

  describe('Without error', () => {
    it('the getAssets method returns the correct status', async () => {
      await assetController.getAssets(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it('the getAssets method returns the correct json', async () => {
      await assetController.getAssets(request, response);
      expect(response.json).toHaveBeenCalledWith(getAssetsExpectedResult);
    });
  });

  describe('With error', () => {
    const AssetRepositoryMockNull = {
      findOne: () => null,
    } as unknown as Repository<Asset>;
    const AssetServiceMockN = new AssetService(AssetRepositoryMockNull);
    const assetControllerN = new AssetController(AssetServiceMockN);

    response.json = jest.fn().mockReturnValue(response);
    response.status = jest.fn().mockReturnValue(response);

    it('the getAssetById return error when findOne returns null', async () => {
      request = {
        ...request,
        params: {
          id: '1',
        },
      } as unknown as Request;
      expect(assetControllerN.getAssetById(request, response)).rejects.toThrow('Ativo não encontrado');
      expect(assetControllerN.getAssetById(request, response)).rejects.toHaveProperty('status', 404);
    });
  });
});
