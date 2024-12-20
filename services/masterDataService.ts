'use server'

import { UnitType } from '@/types/truckmate'
import { fetchWithAuth } from './fetchWithAuth'

const TM_MASTERDATA_API_URL = process.env.TM_MASTERDATA_API_URL

const log = (msg: string, ...args) => {
  console.log(`\u001B[35m [masterDataService]: ${msg}\u001B[0m`, ...args)
}

const getCollectionRequest = async ({ endpoint, limit = 100, params = '' }) => {
  if (!TM_MASTERDATA_API_URL) {
    throw new Error('TM_MASTERDATA_API_URL is not configured')
  }

  const url = `${TM_MASTERDATA_API_URL}/${endpoint}?limit=${limit}${params ? `&${params}` : ''}`

  let response

  try {
    log(`${endpoint} request:`, url)
    const data = await fetchWithAuth(url)

    response = data
    log(`${endpoint} response:`, response)
  } catch (error) {
    let errorMessage = `Failed to fetch ${endpoint}: `

    if (error instanceof Error) {
      console.error(`${endpoint} fetch error details:`, {
        message: error.message,
        stack: error.stack,
        url,
      })

      errorMessage += error.message
    } else {
      errorMessage += 'An unexpected error occurred'
    }

    response = { error: { message: errorMessage } }
  }

  return response
}

export const getServiceLevels = async () => {
  return await getCollectionRequest({ endpoint: 'serviceLevels' })
}

export const getZones = async () => {
  return await getCollectionRequest({ endpoint: 'zones' })
}

export const getUnits = async ({ unitType }: { unitType?: UnitType }) => {
  return await getCollectionRequest({
    endpoint: 'units',
    params: unitType ? `unitType=${unitType}` : '',
  })
}
