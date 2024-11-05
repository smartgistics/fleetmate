import { PrismaClient } from '@prisma/client'
import { mockShipments } from '../src/components/Shipments'

const prisma = new PrismaClient()

async function main() {
  for (const shipment of mockShipments) {
    await prisma.shipment.create({
      data: {
        ...shipment,
        pickupDate: new Date(shipment.pickupDate),
        deliveryDate: new Date(shipment.deliveryDate),
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 