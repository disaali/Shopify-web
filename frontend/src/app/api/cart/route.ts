import { NextResponse } from "next/server";
import { runCartAction, type CartAction } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CartAction;
    const cart = await runCartAction(body);
    return NextResponse.json({ cart });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Cart request failed" }, { status: 500 });
  }
}
