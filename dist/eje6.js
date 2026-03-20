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
class Notificacion {
    constructor(destinatario, mensaje) {
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }
}
class NotificacionEmail extends Notificacion {
    constructor(destinatario, mensaje, asunto) {
        super(destinatario, mensaje);
        this.asunto = asunto;
    }
    enviar() {
        console.log(` Enviando EMAIL a: ${this.destinatario}`);
        console.log(` Asunto:  ${this.asunto}`);
        console.log(` Mensaje: ${this.mensaje}`);
        console.log(" Email enviado exitosamente");
    }
}
class NotificacionSMS extends Notificacion {
    enviar() {
        console.log(` Enviando SMS al número: ${this.destinatario}`);
        console.log(` Mensaje: ${this.mensaje}`);
        console.log("SMS enviado exitosamente");
    }
}
class NotificacionWhatsApp extends Notificacion {
    enviar() {
        console.log(` Enviando mensaje de WHATSAPP a: ${this.destinatario}`);
        console.log(` Mensaje: ${this.mensaje}`);
        console.log(" Mensaje de WhatsApp enviado exitosamente");
    }
}
function pregunta(msg) {
    return new Promise((resolve) => rl.question(msg, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" Sistema de Notificaciones");
        console.log(" Email");
        console.log(" SMS");
        console.log(" WhatsApp");
        const opcion = yield pregunta("Selecciona el canal de notificación (1-3): ");
        const destinatario = yield pregunta("Destinatario (correo/número): ");
        const mensaje = yield pregunta("Mensaje a enviar: ");
        let notificacion;
        switch (opcion.trim()) {
            case "1": {
                const asunto = yield pregunta("Asunto del email: ");
                notificacion = new NotificacionEmail(destinatario, mensaje, asunto);
                break;
            }
            case "2":
                notificacion = new NotificacionSMS(destinatario, mensaje);
                break;
            case "3":
                notificacion = new NotificacionWhatsApp(destinatario, mensaje);
                break;
            default:
                console.log("Opción no válida.");
                rl.close();
                return;
        }
        notificacion.enviar();
        rl.close();
    });
}
main();
