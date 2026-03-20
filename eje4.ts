import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Empleado {
  constructor(public nombre: string) {}
  abstract calcularSalario(): number;
  mostrarSalario(): void {
    console.log(`Empleado: ${this.nombre}`);
    console.log(`Salario a pagar: $${this.calcularSalario().toFixed(2)}`);
  }
}

// Pago por horas trabajadas
class EmpleadoPorHoras extends Empleado {
  constructor(nombre: string, private horas: number, private tarifaPorHora: number) {
    super(nombre);
  }
  calcularSalario(): number {
    return this.horas * this.tarifaPorHora;
  }
}

// Salario fijo mensual
class EmpleadoFijo extends Empleado {
  constructor(nombre: string, private salarioMensual: number) {
    super(nombre);
  }
  calcularSalario(): number {
    return this.salarioMensual;
  }
}

// Salario base + comisión por ventas
class EmpleadoPorComision extends Empleado {
  constructor(
    nombre: string,
    private salarioBase: number,
    private ventas: number,
    private porcentajeComision: number
  ) {
    super(nombre);
  }
  calcularSalario(): number {
    return this.salarioBase + this.ventas * (this.porcentajeComision / 100);
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Empleados ");
  console.log(" Empleado por horas");
  console.log(" Empleado fijo");
  console.log(" Empleado por comisión");

  const opcion = await pregunta("Selecciona el tipo de empleado (1-3): ");
  const nombre = await pregunta("Nombre del empleado: ");
  let empleado: Empleado;

  switch (opcion.trim()) {
    case "1": {
      const horas = parseFloat(await pregunta("Horas trabajadas: "));
      const tarifa = parseFloat(await pregunta("Tarifa por hora ($): "));
      empleado = new EmpleadoPorHoras(nombre, horas, tarifa);
      break;
    }
    case "2": {
      const salario = parseFloat(await pregunta("Salario mensual fijo ($): "));
      empleado = new EmpleadoFijo(nombre, salario);
      break;
    }
    case "3": {
      const base = parseFloat(await pregunta("Salario base ($): "));
      const ventas = parseFloat(await pregunta("Total en ventas ($): "));
      const comision = parseFloat(await pregunta("Porcentaje de comisión (%): "));
      empleado = new EmpleadoPorComision(nombre, base, ventas, comision);
      break;
    }
    default:
      console.log("Opción no válida.");
      rl.close();
      return;
  }

  empleado.mostrarSalario();
  rl.close();
}

main();