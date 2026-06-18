import { prisma } from "./prisma";
// import rtx5070 from "../img/rtx5070/front1.png";

async function main () {
  await prisma.products.createMany({
    data: [
      {
        name: "Nvidia Geforce RTX 5070 MSI Ventus 2X",
        price: 499990,
        img: "",
        stock: 5
      },
      {
        name: "Unidad SSD ADATA Legend 860, 2TB, M.2 2280",
        price: 142990,
        img: "",
        stock: 4
      },
      {
        name: "Placa Madre GIGABYTE B650M, Socket AM5, 2x DDR5",
        price: 140990,
        img: "",
        stock: 3
      },
      {
        name: "Mouse ASUS ROG Harpe Ace Aim Lab Edition",
        price: 89990,
        img: "",
        stock: 7
      }
    ]
  })
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());