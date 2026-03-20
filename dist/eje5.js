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
class Pago {
    constructor(monto) {
        this.monto = monto;
    }
}
class PagoEfectivo extends Pago {
    procesarPago() {
        console.log(`Procesando pago en EFECTIVO por $${this.monto.toFixed(2)}.`);
        console.log("Por favor entregue el dinero en caja. ¡Pago completado!");
    }
}
class PagoTarjeta extends Pago {
    constructor(monto, ultimosDigitos) {
        super(monto);
        this.ultimosDigitos = ultimosDigitos;
    }
    procesarPago() {
        console.log(`Procesando pago con TARJETA terminada en ${this.ultimosDigitos} por $${this.monto.toFixed(2)}.`);
        console.log("Validando datos con el banco... ¡Pago aprobado!");
    }
}
class TransferenciaBancaria extends Pago {
    constructor(monto, cuentaDestino) {
        super(monto);
        this.cuentaDestino = cuentaDestino;
    }
    procesarPago() {
        console.log(`Procesando TRANSFERENCIA de $${this.monto.toFixed(2)} a la cuenta ${this.cuentaDestino}.`);
        console.log("Enviando fondos Transferencia exitosa");
    }
}
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Pagos ");
        console.log("1. Pago en efectivo");
        console.log("2. Pago con tarjeta");
        console.log("3. Transferencia bancaria");
        const opcion = yield pregunta("Selecciona el método de pago (1-3): ");
        const monto = parseFloat(yield pregunta("Monto a pagar ($): "));
        let pago;
        switch (opcion.trim()) {
            case "1":
                pago = new PagoEfectivo(monto);
                break;
            case "2": {
                const digitos = yield pregunta("Últimos 4 dígitos de la tarjeta: ");
                pago = new PagoTarjeta(monto, digitos);
                break;
            }
            case "3": {
                const cuenta = yield pregunta("Número de cuenta destino: ");
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
    });
}
main();
