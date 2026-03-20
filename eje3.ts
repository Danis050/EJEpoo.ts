import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Figura {
  abstract calcularArea(): number;
  abstract calcularPerimetro(): number;
  abstract mostrarResultados(): void;
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }
  calcularArea(): number {
    return this.lado * this.lado;
  }
  calcularPerimetro(): number {
    return 4 * this.lado;
  }
  mostrarResultados(): void {
    console.log(`Cuadrado (lado = ${this.lado})`);
    console.log(`  Área:       ${this.calcularArea()}`);
    console.log(`  Perímetro:  ${this.calcularPerimetro()}`);
  }
}

class Rectangulo extends Figura {
  constructor(private base: number, private altura: number) {
    super();
  }
  calcularArea(): number {
    return this.base * this.altura;
  }
  calcularPerimetro(): number {
    return 2 * (this.base + this.altura);
  }
  mostrarResultados(): void {
    console.log(`Rectángulo (base = ${this.base}, altura = ${this.altura})`);
    console.log(`  Área:       ${this.calcularArea()}`);
    console.log(`  Perímetro:  ${this.calcularPerimetro()}`);
  }
}

class Circulo extends Figura {
  constructor(private radio: number) {
    super();
  }
  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }
  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;
  }
  mostrarResultados(): void {
    console.log(`Círculo (radio = ${this.radio})`);
    console.log(`  Área:       ${this.calcularArea().toFixed(2)}`);
    console.log(`  Perímetro:  ${this.calcularPerimetro().toFixed(2)}`);
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Figuras Geométricas ");
  console.log("1. Cuadrado");
  console.log("2. Rectángulo");
  console.log("3. Círculo");

  const opcion = await pregunta("Selecciona una figura (1-3): ");
  let figura: Figura;

  switch (opcion.trim()) {
    case "1": {
      const lado = parseFloat(await pregunta("Ingresa el lado: "));
      figura = new Cuadrado(lado);
      break;
    }
    case "2": {
      const base = parseFloat(await pregunta("Ingresa la base: "));
      const altura = parseFloat(await pregunta("Ingresa la altura: "));
      figura = new Rectangulo(base, altura);
      break;
    }
    case "3": {
      const radio = parseFloat(await pregunta("Ingresa el radio: "));
      figura = new Circulo(radio);
      break;
    }
    default:
      console.log("Opción no válida.");
      rl.close();
      return;
  }

  figura.mostrarResultados();
  rl.close();
}

main();