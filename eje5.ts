import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Pago {
  constructor(public monto: number) {}
  abstract procesarPago(): void;
}

class PagoEfectivo extends Pago {
  procesarPago(): void {
    console.log(`Procesando pago en EFECTIVO por $${this.monto.toFixed(2)}.`);
    console.log("Por favor entregue el dinero en caja. ¡Pago completado!");
  }
}

class PagoTarjeta extends Pago {
  constructor(monto: number, private ultimosDigitos: string) {
    super(monto);
  }
  procesarPago(): void {
    console.log(`Procesando pago con TARJETA terminada en ${this.ultimosDigitos} por $${this.monto.toFixed(2)}.`);
    console.log("Validando datos con el banco... ¡Pago aprobado!");
  }
}

class TransferenciaBancaria extends Pago {
  constructor(monto: number, private cuentaDestino: string) {
    super(monto);
  }
  procesarPago(): void {
    console.log(`Procesando TRANSFERENCIA de $${this.monto.toFixed(2)} a la cuenta ${this.cuentaDestino}.`);
    console.log("Enviando fondos Transferencia exitosa");
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Pagos ");
  console.log("1. Pago en efectivo");
  console.log("2. Pago con tarjeta");
  console.log("3. Transferencia bancaria");

  const opcion = await pregunta("Selecciona el método de pago (1-3): ");
  const monto = parseFloat(await pregunta("Monto a pagar ($): "));
  let pago: Pago;

  switch (opcion.trim()) {
    case "1":
      pago = new PagoEfectivo(monto);
      break;
    case "2": {
      const digitos = await pregunta("Últimos 4 dígitos de la tarjeta: ");
      pago = new PagoTarjeta(monto, digitos);
      break;
    }
    case "3": {
      const cuenta = await pregunta("Número de cuenta destino: ");
      pago = new TransferenciaBancaria(monto, cuenta);
      break;
    }
    default:
      console.log("Opción no válida.");
      rl.close();
      return;
  }

  pago.procesarPago();
  rl.close();
}

main();