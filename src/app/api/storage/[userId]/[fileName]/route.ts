import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string; fileName: string };
  }
) => {
  console.log(params);
  const filePath = path.join(
    process.env.STORAGE_DIR as string,
    params.userId,
    params.fileName
  );

  try {
    const fileBuffer = await fs.readFile(filePath);
    const contentType =
      mime.getType(params.fileName) || "application/octet-stream";
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.fileName}"`,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
};
