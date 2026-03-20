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
class Producto {
    constructor(nombre, precioBase) {
        this.nombre = nombre;
        this.precioBase = precioBase;
    }
    mostrarInformacion() {
        console.log("");
        console.log(`Producto:      ${this.nombre}`);
        console.log(`Precio base:   $${this.precioBase.toFixed(2)}`);
        this.mostrarDetallesTipo();
        console.log(`Precio final:  $${this.calcularPrecioFinal().toFixed(2)}`);
        console.log("");
    }
    // Cada subclase puede sobrescribir esto para mostrar sus detalles
    mostrarDetallesTipo() { }
}
// IVA del 15%
class ProductoElectronico extends Producto {
    calcularPrecioFinal() {
        return this.precioBase * (1 + ProductoElectronico.IVA);
    }
    mostrarDetallesTipo() {
        const impuesto = this.precioBase * ProductoElectronico.IVA;
        console.log(`IVA (15%):     +$${impuesto.toFixed(2)}`);
    }
}
ProductoElectronico.IVA = 0.15;
// Descuento según temporada
class Ropa extends Producto {
    constructor(nombre, precioBase, temporada) {
        super(nombre, precioBase);
        this.temporada = temporada;
    }
    getDescuento() {
        switch (this.temporada.toLowerCase()) {
            case "verano": return 0.20;
            case "invierno": return 0.10;
            case "rebajas": return 0.30;
            default: return 0.05;
        }
    }
    calcularPrecioFinal() {
        return this.precioBase * (1 - this.getDescuento());
    }
    mostrarDetallesTipo() {
        const desc = this.getDescuento() * 100;
        const ahorro = this.precioBase * this.getDescuento();
        console.log(`Temporada:     ${this.temporada}`);
        console.log(`Descuento:     -${desc}% (-$${ahorro.toFixed(2)})`);
    }
}
// IVA reducido del 5% + descuento si está cerca de vencer
class Alimento extends Producto {
    constructor(nombre, precioBase, diasParaVencer) {
        super(nombre, precioBase);
        this.diasParaVencer = diasParaVencer;
    }
    getDescuentoVencimiento() {
        if (this.diasParaVencer <= 1)
            return 0.50;
        if (this.diasParaVencer <= 3)
            return 0.30;
        if (this.diasParaVencer <= 7)
            return 0.10;
        return 0;
    }
    calcularPrecioFinal() {
        const conIva = this.precioBase * (1 + Alimento.IVA);
        return conIva * (1 - this.getDescuentoVencimiento());
    }
    mostrarDetallesTipo() {
        const iva = this.precioBase * Alimento.IVA;
        const desc = this.getDescuentoVencimiento() * 100;
        console.log(`IVA (5%):      +$${iva.toFixed(2)}`);
        console.log(`Días p/vencer: ${this.diasParaVencer}`);
        if (desc > 0)
            console.log(`Desc. venc.:   -${desc}%`);
    }
}
Alimento.IVA = 0.05;
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Tienda ");
        console.log(" Producto Electrónico  (+ IVA 15%)");
        console.log(" Ropa (descuento por temporada)");
        console.log(" Alimento (+ IVA 5%, descuento por vencimiento)");
        const opcion = yield pregunta("Selecciona el tipo de producto (1-3): ");
        const nombre = yield pregunta("Nombre del producto: ");
        const precioBase = parseFloat(yield pregunta("Precio base ($): "));
        let producto;
        switch (opcion.trim()) {
            case "1":
                producto = new ProductoElectronico(nombre, precioBase);
                break;
            case "2": {
                console.log("Temporadas disponibles: verano, invierno, rebajas, normal");
                const temporada = yield pregunta("Temporada actual: ");
                producto = new Ropa(nombre, precioBase, temporada);
                break;
            }
            case "3": {
                const dias = parseInt(yield pregunta("Días para vencer: "));
                producto = new Alimento(nombre, precioBase, dias);
                break;
            }
            default:
                console.log("Opción no válida.");
                rl.close();
                return;
        }
        producto.mostrarInformacion();
        rl.close();
    });
}
main();
