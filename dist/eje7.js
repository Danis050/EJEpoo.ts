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
class Transporte {
    constructor(distancia) {
        this.distancia = distancia;
    }
    mostrarCosto() {
        console.log(`Distancia recorrida: ${this.distancia} km`);
        console.log(`Costo del viaje: $${this.calcularCosto().toFixed(2)}`);
    }
}
// Tarifa base + costo por km
class Taxi extends Transporte {
    calcularCosto() {
        return Taxi.TARIFA_BASE + this.distancia * Taxi.COSTO_POR_KM;
    }
}
Taxi.TARIFA_BASE = 2.5;
Taxi.COSTO_POR_KM = 1.8;
// Precio fijo bajo por km
class Autobus extends Transporte {
    calcularCosto() {
        return Math.max(this.distancia * Autobus.COSTO_POR_KM, Autobus.MINIMO);
    }
}
Autobus.COSTO_POR_KM = 0.3;
Autobus.MINIMO = 0.5;
// Tarifa base + costo por km + recargo de servicio
class Uber extends Transporte {
    calcularCosto() {
        return Uber.TARIFA_BASE + this.distancia * Uber.COSTO_POR_KM + Uber.RECARGO_SERVICIO;
    }
}
Uber.TARIFA_BASE = 1.5;
Uber.COSTO_POR_KM = 1.5;
Uber.RECARGO_SERVICIO = 0.99;
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Transporte ");
        console.log(" Taxi  (base $2.50 + $1.80/km)");
        console.log(" Autobús ($0.30/km, mínimo $0.50)");
        console.log(" Uber  (base $1.50 + $1.50/km + $0.99 servicio)");
        const opcion = yield pregunta("Selecciona el medio de transporte (1-3): ");
        const distancia = parseFloat(yield pregunta("Ingresa la distancia en km: "));
        let transporte;
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
    });
}
main();
