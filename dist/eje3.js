"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Figura {
}
class Cuadrado extends Figura {
    constructor(lado) {
        super();
        this.lado = lado;
    }
    calcularArea() {
        return this.lado * this.lado;
    }
    calcularPerimetro() {
        return 4 * this.lado;
    }
    mostrarResultados() {
        console.log(`Cuadrado (lado = ${this.lado})`);
        console.log(`  Área:       ${this.calcularArea()}`);
        console.log(`  Perímetro:  ${this.calcularPerimetro()}`);
    }
}
class Rectangulo extends Figura {
    constructor(base, altura) {
        super();
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return this.base * this.altura;
    }
    calcularPerimetro() {
        return 2 * (this.base + this.altura);
    }
    mostrarResultados() {
        console.log(`Rectángulo (base = ${this.base}, altura = ${this.altura})`);
        console.log(`  Área:       ${this.calcularArea()}`);
        console.log(`  Perímetro:  ${this.calcularPerimetro()}`);
    }
}
class Circulo extends Figura {
    constructor(radio) {
        super();
        this.radio = radio;
    }
    calcularArea() {
        return Math.PI * this.radio * this.radio;
    }
    calcularPerimetro() {
        return 2 * Math.PI * this.radio;
    }
    mostrarResultados() {
        console.log(`Círculo (radio = ${this.radio})`);
        console.log(`  Área:       ${this.calcularArea().toFixed(2)}`);
        console.log(`  Perímetro:  ${this.calcularPerimetro().toFixed(2)}`);
    }
}
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Figuras Geométricas ");
        console.log("1. Cuadrado");
        console.log("2. Rectángulo");
        console.log("3. Círculo");
        const opcion = yield pregunta("Selecciona una figura (1-3): ");
        let figura;
        switch (opcion.trim()) {
            case "1": {
                const lado = parseFloat(yield pregunta("Ingresa el lado: "));
                figura = new Cuadrado(lado);
                break;
            }
            case "2": {
                const base = parseFloat(yield pregunta("Ingresa la base: "));
                const altura = parseFloat(yield pregunta("Ingresa la altura: "));
                figura = new Rectangulo(base, altura);
                break;
            }
            case "3": {
                const radio = parseFloat(yield pregunta("Ingresa el radio: "));
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
    });
}
main();
