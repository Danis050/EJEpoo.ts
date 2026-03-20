import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Producto {
  constructor(
    public nombre: string,
    public precioBase: number
  ) {}

  abstract calcularPrecioFinal(): number;

  mostrarInformacion(): void {
    console.log("");
    console.log(`Producto:      ${this.nombre}`);
    console.log(`Precio base:   $${this.precioBase.toFixed(2)}`);
    this.mostrarDetallesTipo();
    console.log(`Precio final:  $${this.calcularPrecioFinal().toFixed(2)}`);
    console.log("");
  }

  // Cada subclase puede sobrescribir esto para mostrar sus detalles
  protected mostrarDetallesTipo(): void {}
}

// IVA del 15%
class ProductoElectronico extends Producto {
  private static readonly IVA = 0.15;

  calcularPrecioFinal(): number {
    return this.precioBase * (1 + ProductoElectronico.IVA);
  }

  protected mostrarDetallesTipo(): void {
    const impuesto = this.precioBase * ProductoElectronico.IVA;
    console.log(`IVA (15%):     +$${impuesto.toFixed(2)}`);
  }
}

// Descuento según temporada
class Ropa extends Producto {
  constructor(nombre: string, precioBase: number, private temporada: string) {
    super(nombre, precioBase);
  }

  private getDescuento(): number {
    switch (this.temporada.toLowerCase()) {
      case "verano":   return 0.20;
      case "invierno": return 0.10;
      case "rebajas":  return 0.30;
      default:         return 0.05;
    }
  }

  calcularPrecioFinal(): number {
    return this.precioBase * (1 - this.getDescuento());
  }

  protected mostrarDetallesTipo(): void {
    const desc = this.getDescuento() * 100;
    const ahorro = this.precioBase * this.getDescuento();
    console.log(`Temporada:     ${this.temporada}`);
    console.log(`Descuento:     -${desc}% (-$${ahorro.toFixed(2)})`);
  }
}

// IVA reducido del 5% + descuento si está cerca de vencer
class Alimento extends Producto {
  private static readonly IVA = 0.05;

  constructor(nombre: string, precioBase: number, private diasParaVencer: number) {
    super(nombre, precioBase);
  }

  private getDescuentoVencimiento(): number {
    if (this.diasParaVencer <= 1) return 0.50;
    if (this.diasParaVencer <= 3) return 0.30;
    if (this.diasParaVencer <= 7) return 0.10;
    return 0;
  }

  calcularPrecioFinal(): number {
    const conIva = this.precioBase * (1 + Alimento.IVA);
    return conIva * (1 - this.getDescuentoVencimiento());
  }

  protected mostrarDetallesTipo(): void {
    const iva = this.precioBase * Alimento.IVA;
    const desc = this.getDescuentoVencimiento() * 100;
    console.log(`IVA (5%):      +$${iva.toFixed(2)}`);
    console.log(`Días p/vencer: ${this.diasParaVencer}`);
    if (desc > 0) console.log(`Desc. venc.:   -${desc}%`);
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Tienda ");
  console.log(" Producto Electrónico  (+ IVA 15%)");
  console.log(" Ropa (descuento por temporada)");
  console.log(" Alimento (+ IVA 5%, descuento por vencimiento)");

  const opcion = await pregunta("Selecciona el tipo de producto (1-3): ");
  const nombre = await pregunta("Nombre del producto: ");
  const precioBase = parseFloat(await pregunta("Precio base ($): "));
  let producto: Producto;

  switch (opcion.trim()) {
    case "1":
      producto = new ProductoElectronico(nombre, precioBase);
      break;
    case "2": {
      console.log("Temporadas disponibles: verano, invierno, rebajas, normal");
      const temporada = await pregunta("Temporada actual: ");
      producto = new Ropa(nombre, precioBase, temporada);
      break;
    }
    case "3": {
      const dias = parseInt(await pregunta("Días para vencer: "));
      producto = new Alimento(nombre, precioBase, dias);
      break;
    }
    default:
      console.log("Opción no válida.");
      rl.close();
      return;
  }

  producto.mostrarInformacion();
  rl.close();
}

main();
