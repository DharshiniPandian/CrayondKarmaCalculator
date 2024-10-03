import { config } from './Config'
import { masterVehicles, masterFuel, masterFood, masterAppliances, masterTransaction } from './EndPoints'

const buildUrl = (path) => `${config.protocol}://${config.host}:${config.port}${path}`

export const MasterVehiclesApi = buildUrl(masterVehicles)
export const MasterFuelApi = buildUrl(masterFuel)
export const MasterFoodsApi = buildUrl(masterFood)
export const MasterAppliancesApi = buildUrl(masterAppliances)
export const MasterTransactionApi = buildUrl(masterTransaction)
