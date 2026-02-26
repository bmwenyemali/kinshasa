import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Kin Services";
  const description =
    searchParams.get("desc") || "Le guide des services publics de Kinshasa";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        background:
          "linear-gradient(135deg, #0077BE 0%, #005a8e 50%, #003d6b 100%)",
        padding: "60px 80px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern dots */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(255, 196, 0, 0.15)",
        }}
      />

      {/* Flag accent bar */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: 60,
            height: 6,
            background: "#007FFF",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            width: 60,
            height: 6,
            background: "#FFC400",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            width: 60,
            height: 6,
            background: "#CE1126",
            borderRadius: 3,
          }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-1px",
          maxWidth: "80%",
          marginBottom: "16px",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.4,
          maxWidth: "70%",
          marginBottom: "40px",
        }}
      >
        {description}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#FFC400",
            letterSpacing: "1px",
          }}
        >
          KIN SERVICES
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          • kinshasa-seven.vercel.app
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
