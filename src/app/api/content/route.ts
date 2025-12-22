import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// import fs from "fs";
// import path from "path";
// const contentFile = path.join(process.cwd(), "data", "content.json");

// GET → devuelve el contenido
// export async function GET() {
//   try {
//     if (!fs.existsSync(contentFile)) {
//       return NextResponse.json({
//         hero: { titulo: "", subtitulo: "", imagenes: [] },
//         servicios: Array(4).fill({
//           titulo: "",
//           descripcion: "",
//           incluye1: "",
//           incluye2: "",
//           ubicacion: "",
//           nota: "",
//           duracion: "",
//         }),
//         sobreMi: { parrafo1: "", parrafo2: "", parrafo3: "" },
//       });
//     }

//     const file = fs.readFileSync(contentFile, "utf-8");
//     const data = JSON.parse(file);
//     return NextResponse.json(data);
//   } catch {
//     return NextResponse.json(
//       { error: "No se pudo leer el contenido" },
//       { status: 500 }
//     );
//   }
// }

// // POST → guarda el contenido
// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const content = await req.json();

//     const dataDir = path.join(process.cwd(), "data");
//     if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

//     fs.writeFileSync(contentFile, JSON.stringify(content, null, 2), "utf-8");

//     return NextResponse.json({ ok: true });
//   } catch {
//     return NextResponse.json(
//       { error: "No se pudo guardar el contenido" },
//       { status: 500 }
//     );
//   }
// }

// GET → devuelve el contenido
export async function GET() {
  try {
    const content = await prisma.contenido.findUnique({
      where: { key: "main" },
    });

    if (!content) {
      // contenido vacío por defecto
      return NextResponse.json({
        hero: { titulo: "", subtitulo: "", imagenes: [] },
        servicios: Array(4).fill({
          titulo: "",
          descripcion: "",
          incluye1: "",
          incluye2: "",
          ubicacion: "",
          nota: "",
          duracion: "",
        }),
        sobreMi: { parrafo1: "", parrafo2: "", parrafo3: "" },
      });
    }

    return NextResponse.json(content.data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo leer el contenido" },
      { status: 500 }
    );
  }
}

// POST → guarda el contenido
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await req.json();
    await prisma.contenido.upsert({
      where: { key: "main" }, // usamos la columna key
      update: { data: content }, // si existe, actualizamos
      create: { key: "main", data: content }, // si no existe, creamos
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo guardar el contenido" },
      { status: 500 }
    );
  }
}
