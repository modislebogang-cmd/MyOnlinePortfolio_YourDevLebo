import { useEffect, useRef } from "react";

/**
 * Full-screen Matrix "digital rain" background rendered on a <canvas>.
 * Columns of katakana / latin glyphs fall down the screen, the leading
 * glyph glows bright while the tail fades out.
 */
export default function MatrixRain({ fontSize = 18, color = "#00ff66" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/\\|=+*#@$%&";

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let animationId = 0;

    const setup = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ui-monospace, monospace`;

      columns = Math.ceil(width / fontSize);
      // Each column starts at a random negative row so the rain isn't uniform.
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / fontSize),
      );
    };

    const draw = () => {
      // Fade the previous frame instead of clearing -> trailing glyph effect.
      ctx.fillStyle = "rgba(3, 7, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Bright leading glyph.
        ctx.fillStyle = "#d7ffe9";
        ctx.fillText(char, x, y);

        // Dimmer trailing glyph just above it.
        ctx.fillStyle = color;
        ctx.fillText(
          glyphs[Math.floor(Math.random() * glyphs.length)],
          x,
          y - fontSize,
        );

        // Randomly reset a column back to the top.
        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.floor((Math.random() * -20) / 2);
        }
        drops[i] += 1;
      }

      animationId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [fontSize, color]);

  return (
    <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
  );
}
