import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Transporte {
  constructor(public distancia: number) {}
  abstract calcularCosto(): number;
  mostrarCosto(): void {
    console.log(`Distancia recorrida: ${this.distancia} km`);
    console.log(`Costo del viaje: $${this.calcularCosto().toFixed(2)}`);
  }
}

// Tarifa base + costo por km
class Taxi extends Transporte {
  private static readonly TARIFA_BASE = 2.5;
  private static readonly COSTO_POR_KM = 1.8;
  calcularCosto(): number {
    return Taxi.TARIFA_BASE + this.distancia * Taxi.COSTO_POR_KM;
  }
}

// Precio fijo bajo por km
class Autobus extends Transporte {
  private static readonly COSTO_POR_KM = 0.3;
  private static readonly MINIMO = 0.5;
  calcularCosto(): number {
    return Math.max(this.distancia * Autobus.COSTO_POR_KM, Autobus.MINIMO);
  }
}

// Tarifa base + costo por km + recargo de servicio
class Uber extends Transporte {
  private static readonly TARIFA_BASE = 1.5;
  private static readonly COSTO_POR_KM = 1.5;
  private static readonly RECARGO_SERVICIO = 0.99;
  calcularCosto(): number {
    return Uber.TARIFA_BASE + this.distancia * Uber.COSTO_POR_KM + Uber.RECARGO_SERVICIO;
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Transporte ");
  console.log(" Taxi  (base $2.50 + $1.80/km)");
  console.log(" Autobús ($0.30/km, mínimo $0.50)");
  console.log(" Uber  (base $1.50 + $1.50/km + $0.99 servicio)");

  const opcion = await pregunta("Selecciona el medio de transporte (1-3): ");
  const distancia = parseFloat(await pregunta("Ingresa la distancia en km: "));
  let transporte: Transporte;

  switch (opcion.trim()) {
    case "1":
      transporte = new Taxi(distancia);
      console.log(" Taxi seleccionado");
      break;
    case "2":
      transporte = new Autobus(distancia);
      console.log("Autobús seleccionado");
      break;
    case "3":
      transporte = new Uber(distancia);
      console.log(" Uber seleccionado");
      break;
    default:
      console.log("Opción no válida.");
      rl.close();
      return;
  }

  transporte.mostrarCosto();
  rl.close();
}

main();