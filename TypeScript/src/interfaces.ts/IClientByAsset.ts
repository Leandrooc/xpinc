export interface IAssetInCustody {
    assetId: number,
    quantity: number,
    value: number
}

export interface IClientByAsset {
    clientId: number,
    clientBalance: number,
    assetsInCustody: IAssetInCustody[],
}
