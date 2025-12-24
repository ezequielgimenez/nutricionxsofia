import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { nombre, email, motivo, mensaje } = body;

//     await resend.emails.send({
//       from: "Contacto <ezequiel@resend.dev>",
//       to: ["ezequielgimenezdev@gmail.com"],
//       replyTo: email,
//       subject: `Nueva consulta: ${motivo}`,
//       html: `
//         <h2>Nueva consulta desde la web</h2>
//         <p><b>Nombre:</b> ${nombre}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Motivo:</b> ${motivo}</p>
//         <p><b>Mensaje:</b><br/>${mensaje}</p>
//       `,
//     });

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("ERROR API CONTACT:", error);
//     return NextResponse.json({ error: "Error" }, { status: 500 });
//   }
// }

// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { nombre, email, motivo, mensaje } = body;

//     if (!nombre || !email || !motivo || !mensaje) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Faltan campos obligatorios" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "ezequielgimenezdev@gmail.com",
//         pass: process.env.EMAIL_APP_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Contacto Web" <ezequielgimenezdev@gmail.com>`,
//       to: "ezequielezequiel9@gmail.com",
//       replyTo: email,
//       subject: `Nueva consulta: ${motivo}`,
//       html: `
//         <h2>Nueva consulta desde la web</h2>
//         <p><b>Nombre:</b> ${nombre}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Motivo:</b> ${motivo}</p>
//         <p><b>Mensaje:</b></p>
//         <p>${mensaje.replace(/\n/g, "<br/>")}</p>
//       `,
//     });

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error enviando mail:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: "Error enviando el mensaje" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, motivo, mensaje } = body;

    if (!nombre || !email || !motivo || !mensaje) {
      return new Response(
        JSON.stringify({ success: false, error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await resend.emails.send({
      from: `"Contacto Web - nutriciónxsofía" <${process.env.EMAIL_FROM}>`,
      to: "nutricionxsofia@gmail.com",
      replyTo: email,
      subject: `Nueva consulta: ${motivo}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Motivo:</b> ${motivo}</p>
        <p><b>Mensaje:</b></p>
        <p>${mensaje.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error enviando mail:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error enviando el mensaje" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
