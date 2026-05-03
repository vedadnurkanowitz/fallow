import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook calls this endpoint after any content publish.
// It revalidates the affected pages based on the document type.
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const type = body._type;

  switch (type) {
    case "menuItem":
    case "category":
      revalidatePath("/menu");
      revalidatePath("/");
      break;
    case "shopInfo":
      revalidatePath("/visit");
      revalidatePath("/");
      break;
    case "seasonalFeature":
      revalidatePath("/");
      break;
    default:
      // Revalidate everything on unknown type changes.
      revalidatePath("/", "layout");
  }

  return NextResponse.json({
    revalidated: true,
    type,
    now: Date.now(),
  });
}
