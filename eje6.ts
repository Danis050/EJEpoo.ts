import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class Notificacion {
  constructor(public destinatario: string, public mensaje: string) {}
  abstract enviar(): void;
}

class NotificacionEmail extends Notificacion {
  constructor(destinatario: string, mensaje: string, private asunto: string) {
    super(destinatario, mensaje);
  }
  enviar(): void {
    console.log(` Enviando EMAIL a: ${this.destinatario}`);
    console.log(` Asunto:  ${this.asunto}`);
    console.log(` Mensaje: ${this.mensaje}`);
    console.log(" Email enviado exitosamente");
  }
}

class NotificacionSMS extends Notificacion {
  enviar(): void {
    console.log(` Enviando SMS al número: ${this.destinatario}`);
    console.log(` Mensaje: ${this.mensaje}`);
    console.log("SMS enviado exitosamente");
  }
}

class NotificacionWhatsApp extends Notificacion {
  enviar(): void {
    console.log(` Enviando mensaje de WHATSAPP a: ${this.destinatario}`);
    console.log(` Mensaje: ${this.mensaje}`);
    console.log(" Mensaje de WhatsApp enviado exitosamente");
  }
}

function pregunta(msg: string): Promise<string> {
  return new Promise((resolve) => rl.question(msg, resolve));
}

async function main() {
  console.log(" Sistema de Notificaciones");
  console.log(" Email");
  console.log(" SMS");
  console.log(" WhatsApp");

  const opcion = await pregunta("Selecciona el canal de notificación (1-3): ");
  const destinatario = await pregunta("Destinatario (correo/número): ");
  const mensaje = await pregunta("Mensaje a enviar: ");
  let notificacion: Notificacion;

  switch (opcion.trim()) {
    case "1": {
      const asunto = await pregunta("Asunto del email: ");
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
}

main();