import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Clase abstracta
abstract class Animal {
  constructor(public nombre: string) {}
  abstract hacerSonido(): void;
}

class Perro extends Animal {
  hacerSonido(): void {
    console.log(`${this.nombre} dice: Guau guau`);
  }
}

class Gato extends Animal {
  hacerSonido(): void {
    console.log(`${this.nombre} dice: Miau miau`);
  }
}

class Vaca extends Animal {
  hacerSonido(): void {
    console.log(`${this.nombre} dice: Muuu muuu`);
  }
}

console.log(" Sistema de Animales ");
console.log(" Perro");
console.log(" Gato");
console.log("Vaca");

rl.question("Selecciona un animal (1-3): ", (opcion) => {
  rl.question("Ingresa el nombre del animal: ", (nombre) => {
    let animal: Animal;

    switch (opcion.trim()) {
      case "1":
        animal = new Perro(nombre);
        break;
      case "2":
        animal = new Gato(nombre);
        break;
      case "3":
        animal = new Vaca(nombre);
        break;
      default:
        console.log("Opción no válida.");
        rl.close();
        return;
    }

    animal.hacerSonido();
    rl.close();
  });
});
