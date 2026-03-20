import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Vehiculo {
  constructor(public modelo: string) {}
  abstract mover(): void;
}

class Carro extends Vehiculo {
  mover(): void {
    console.log(`El carro ${this.modelo} se mueve usando su motor a gasolina por las carreteras.`);
  }
}

class Bicicleta extends Vehiculo {
  mover(): void {
    console.log(`La bicicleta ${this.modelo} se mueve pedaleando por el carril bici.`);
  }
}

class Motocicleta extends Vehiculo {
  mover(): void {
    console.log(`La motocicleta ${this.modelo} se mueve acelerando su motor por la vía.`);
  }
}

console.log("Sistema de Vehículos ");
console.log("1. Carro");
console.log("2. Bicicleta");
console.log("3. Motocicleta");

rl.question("Selecciona un vehículo (1-3): ", (opcion) => {
  rl.question("Ingresa el modelo del vehículo: ", (modelo) => {
    let vehiculo: Vehiculo;

    switch (opcion.trim()) {
      case "1":
        vehiculo = new Carro(modelo);
        break;
      case "2":
        vehiculo = new Bicicleta(modelo);
        break;
      case "3":
        vehiculo = new Motocicleta(modelo);
        break;
      default:
        console.log("Opción no válida.");
        rl.close();
        return;
    }

    vehiculo.mover();
    rl.close();
  });
});
