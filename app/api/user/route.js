import { connectToDB } from "../../lib/utils";
import { User } from "../../lib/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, id, image, role } = await request.json();
  await connectToDB();
  await User.create({ name, email, id, image, role });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
