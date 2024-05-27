import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string; projectId: string; fileName: string };
  }
) => {
  try {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: params.userId + params.projectId,
        Key: params.fileName,
      })
    );

    const contentType =
      res.ContentType ||
      mime.getType(params.fileName) ||
      "application/octet-stream";

    const buffer = await res.Body?.transformToWebStream();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.fileName}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
};
