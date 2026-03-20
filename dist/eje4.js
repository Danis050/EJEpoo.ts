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
class Empleado {
    constructor(nombre) {
        this.nombre = nombre;
    }
    mostrarSalario() {
        console.log(`Empleado: ${this.nombre}`);
        console.log(`Salario a pagar: $${this.calcularSalario().toFixed(2)}`);
    }
}
// Pago por horas trabajadas
class EmpleadoPorHoras extends Empleado {
    constructor(nombre, horas, tarifaPorHora) {
        super(nombre);
        this.horas = horas;
        this.tarifaPorHora = tarifaPorHora;
    }
    calcularSalario() {
        return this.horas * this.tarifaPorHora;
    }
}
// Salario fijo mensual
class EmpleadoFijo extends Empleado {
    constructor(nombre, salarioMensual) {
        super(nombre);
        this.salarioMensual = salarioMensual;
    }
    calcularSalario() {
        return this.salarioMensual;
    }
}
// Salario base + comisión por ventas
class EmpleadoPorComision extends Empleado {
    constructor(nombre, salarioBase, ventas, porcentajeComision) {
        super(nombre);
        this.salarioBase = salarioBase;
        this.ventas = ventas;
        this.porcentajeComision = porcentajeComision;
    }
    calcularSalario() {
        return this.salarioBase + this.ventas * (this.porcentajeComision / 100);
    }
}
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Empleados ");
        console.log(" Empleado por horas");
        console.log(" Empleado fijo");
        console.log(" Empleado por comisión");
        const opcion = yield pregunta("Selecciona el tipo de empleado (1-3): ");
        const nombre = yield pregunta("Nombre del empleado: ");
        let empleado;
        switch (opcion.trim()) {
            case "1": {
                const horas = parseFloat(yield pregunta("Horas trabajadas: "));
                const tarifa = parseFloat(yield pregunta("Tarifa por hora ($): "));
                empleado = new EmpleadoPorHoras(nombre, horas, tarifa);
                break;
            }
            case "2": {
                const salario = parseFloat(yield pregunta("Salario mensual fijo ($): "));
                empleado = new EmpleadoFijo(nombre, salario);
                break;
            }
            case "3": {
                const base = parseFloat(yield pregunta("Salario base ($): "));
                const ventas = parseFloat(yield pregunta("Total en ventas ($): "));
                const comision = parseFloat(yield pregunta("Porcentaje de comisión (%): "));
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
    });
}
main();
