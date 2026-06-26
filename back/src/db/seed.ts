import { prisma } from "./prisma";

async function main () {
  await prisma.products.createMany({
    data: [
      {
        name: "Notebook GIGABYTE AORUS 17H, RTX 4080, FHD 360HZ",
        price: 2499990,
        img: "https://i.postimg.cc/V6Tvs0gn/front1.png",
        category: "gaming-pc-notebook-gamer",
        stock: 3
      },
      {
        name: "Monitor Gamer GIGABYTE GS25F2A FULLHD, 240HZ",
        price: 219990,
        img: "https://i.postimg.cc/y8VQBLNb/front1.png",
        category: "monitores-gamer",
        stock: 4
      },
      {
        name: "Placa Madre GIGABYTE B650M, Socker AM5",
        price: 119990,
        img: "https://i.postimg.cc/DwgNbtNp/front1.png",
        category: "componentes-placa-madre",
        stock: 6
      },
      {
        name: "Monitor Gamer ASUS TUF Gaming QHD, 210HZ",
        price: 169990,
        img: "https://i.postimg.cc/2S4cNPmG/front1.png",
        category: "monitores-gamer",
        stock: 4
      },
      {
        name: "Mouse Gamer ASUS ROG Harpe Ace Aim Lab Negro",
        price: 89990,
        img: "https://i.postimg.cc/Wbtcjpfg/front1.webp",
        category: "mouse-gamer",
        stock: 7
      },
      {
        name: "Tarjeta Video MSI NVIDIA GeForce RTX 5070 VENTUS",
        price: 819990,
        img: "https://i.postimg.cc/B6stwPpp/front1.png",
        category: "componentes-tarjeta-de-video",
        stock: 6
      },
      {
        name: "Fuente de Poder ASUS TUF Gaming 80 PLUS Gold",
        price: 108030,
        img: "https://i.postimg.cc/WbXkx8qY/front1.png",
        category: "componentes-fuente-de-poder",
        stock: 3
      },
      {
        name: "Teclado Gamer Primus Ballista 82T Star Wars 75%",
        price: 59990,
        img: "https://i.postimg.cc/QM7Wz3rP/front1.png",
        category: "teclado-gamer",
        stock: 8
      },
      {
        name: "Gabinete Gamer Cooler Master ELITE 520 Negro",
        price: 67050,
        img: "https://i.postimg.cc/qqWNwb53/front.png",
        category: "gabinete-gamer",
        stock: 5
      },
      {
        name: "Memoria RAM XPG Spectrix DDR4 16GB RGB",
        price: 329990,
        img: "https://i.postimg.cc/ncYx0S5W/front1.png",
        category: "componentes-memoria-ram",
        stock: 7
      },
      {
        name: "Unidad SSD ADATA Legend 860, 1TB, NVMe PCIe 4.0",
        price: 169990,
        img: "https://i.postimg.cc/tT2RSS7M/front1.png",
        category: "componentes-almacenamiento-ssd",
        stock: 10
      },
      {
        name: "Refrigeración Liquida TUF Gaming Intel/AMD",
        price: 158720,
        img: "https://i.postimg.cc/Z5XChMbL/front1.png",
        category: "componentes-refrigeracion-ventilacion",
        stock: 5
      },
      {
        name: "Audifonos Gamer Razer BlackShark V2",
        price: 44510,
        img: "https://i.postimg.cc/W1vRZm1C/front1.png",
        category: "audifonos-gamer",
        stock: 9
      },
      {
        name: "Monitor Gamer ASUS ROG STRIX QHD, 320HZ",
        price: 324990,
        img: "https://i.postimg.cc/FHcqsYbd/front1.png",
        category: "monitores-gamer",
        stock: 4
      },
      {
        name: "Smartwatch MOTOROLA Moto Watch Fit",
        price: 329990,
        img: "https://i.postimg.cc/nrJ5mpng/front.png",
        category: "smartwatches",
        stock: 7
      },
    ]
  })
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());