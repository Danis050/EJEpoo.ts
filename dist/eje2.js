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
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Vehiculo {
    constructor(modelo) {
        this.modelo = modelo;
    }
}
class Carro extends Vehiculo {
    mover() {
        console.log(`El carro ${this.modelo} se mueve usando su motor a gasolina por las carreteras.`);
    }
}
class Bicicleta extends Vehiculo {
    mover() {
        console.log(`La bicicleta ${this.modelo} se mueve pedaleando por el carril bici.`);
    }
}
class Motocicleta extends Vehiculo {
    mover() {
        console.log(`La motocicleta ${this.modelo} se mueve acelerando su motor por la vía.`);
    }
}
console.log("Sistema de Vehículos ");
console.log("1. Carro");
console.log("2. Bicicleta");
console.log("3. Motocicleta");
rl.question("Selecciona un vehículo (1-3): ", (opcion) => {
    rl.question("Ingresa el modelo del vehículo: ", (modelo) => {
        let vehiculo;
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
