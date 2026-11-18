/**
 * Editable canvas artwork for the Lanyard's two 3D card faces.
 * Change the PHOTO and FRONT_CURVE values below to adjust the design.
 */

export interface QRCodeMatrix {
  modules: {
    size: number;
    data: Uint8Array;
  };
}

export interface IdCardDesignSettings {
  employeeName: string;
  employeeRole: string;
  companyName: string;
  employeeId: string;
  portfolioUrl: string;
  email: string;
  department: string;
}

// All photo values are relative to the canvas size (0..1).
// x/y control its top-left corner; width/height control its visible frame.
export const FRONT_PHOTO = {
  x: 0.057,
  y: 0.15,
  width: 0.886,
  height: 0.625,
  cornerRadius: 34,
  fit: 'cover' as const,
};

// The black panel has one continuous curve: a straight line from the
// left edge to curveStartX, followed by a single smooth drop to the right.
export const FRONT_CURVE = {
  startY: 0.665,
  curveStartX: 0.60,
  curveEndX: 0.76,
  curveDrop: 0.055,
};

const drawFittedAt = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  fit: 'cover' | 'contain' = 'cover'
) => {
  const scale = (fit === 'contain' ? Math.min : Math.max)(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
};

const drawGlassBase = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const glass = ctx.createLinearGradient(0, 0, width, height);
  glass.addColorStop(0, 'rgba(255,255,255,0.34)');
  glass.addColorStop(0.48, 'rgba(235,239,245,0.16)');
  glass.addColorStop(1, 'rgba(255,255,255,0.27)');
  ctx.fillStyle = glass;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(255,255,255,0.72)';
  ctx.lineWidth = 5;
  ctx.strokeRect(13, 13, width - 26, height - 26);
  ctx.strokeStyle = 'rgba(255,255,255,0.24)';
  ctx.lineWidth = 2;
  ctx.strokeRect(27, 27, width - 54, height - 54);

  const sheen = ctx.createLinearGradient(0, 0, width * 0.8, height * 0.35);
  sheen.addColorStop(0, 'rgba(255,255,255,0.22)');
  sheen.addColorStop(0.35, 'rgba(255,255,255,0.035)');
  sheen.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height * 0.48);
};

const drawFrontCurvePanel = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) => {
  const y = h * FRONT_CURVE.startY;
  const startX = w * FRONT_CURVE.curveStartX;
  const endX = w * FRONT_CURVE.curveEndX;
  const endY = y + h * FRONT_CURVE.curveDrop;

  ctx.beginPath();
  ctx.moveTo(0, y);

  // First section: straight
  ctx.lineTo(startX, y);

  // Second section: one smooth downward transition
  ctx.bezierCurveTo(
    startX + (endX - startX) * 0.35, y,
    startX + (endX - startX) * 0.65, endY,
    endX, endY
  );

  // Continue straight
  ctx.lineTo(w, endY);

  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();

  ctx.fillStyle = '#090909';
  ctx.fill();
};


const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(12,12,12,0.9)';
  ctx.lineWidth = 13;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-34, -48);
  ctx.lineTo(-3, 0);
  ctx.lineTo(43, -17);
  ctx.moveTo(-3, 0);
  ctx.lineTo(18, 48);
  ctx.stroke();
  ctx.restore();
};

export const drawIdCardFront = (
  canvas: HTMLCanvasElement,
  portrait: HTMLImageElement | null,
  settings: IdCardDesignSettings
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  drawGlassBase(ctx, w, h);

  const photo = {
    x: Math.round(w * FRONT_PHOTO.x),
    y: Math.round(h * FRONT_PHOTO.y),
    width: Math.round(w * FRONT_PHOTO.width),
    height: Math.round(h * FRONT_PHOTO.height),
  };

  if (portrait) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photo.x, photo.y, photo.width, photo.height, FRONT_PHOTO.cornerRadius);
    ctx.clip();
    drawFittedAt(ctx, portrait, photo.x, photo.y, photo.width, photo.height, FRONT_PHOTO.fit);
    ctx.restore();

    const wash = ctx.createLinearGradient(0, photo.y, 0, photo.y + photo.height);
    wash.addColorStop(0, 'rgba(255,255,255,0.06)');
    wash.addColorStop(1, 'rgba(255,255,255,0.015)');
    ctx.fillStyle = wash;
    ctx.fillRect(photo.x, photo.y, photo.width, photo.height);
  }

  drawFrontCurvePanel(ctx, w, h);
  drawStar(ctx, 142, 100);

  const panelY = h * FRONT_CURVE.startY;
  const left = 82;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffffff';
  ctx.font = '500 78px Arial, Helvetica, sans-serif';
  ctx.fillText(settings.employeeName, left, panelY + 170, w - 150);
  ctx.font = '400 43px Arial, Helvetica, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.88)';
  ctx.fillText(settings.employeeRole, left, panelY + 238, w - 150);

  ctx.font = '400 31px Arial, Helvetica, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  ctx.textAlign = 'left';
  ctx.fillText(settings.companyName, left, h - 74, w * 0.56);
  ctx.textAlign = 'right';
  ctx.fillText(`ID ${settings.employeeId}`, w - left, h - 74, w * 0.38);
};

export const drawIdCardBack = (
  canvas: HTMLCanvasElement,
  qrCode: QRCodeMatrix | null,
  settings: IdCardDesignSettings
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Minimal all-black back face.
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, w, h);

  // White dotted QR on black, with a clear quiet zone around the matrix.
  if (qrCode) {
    const matrixSize = qrCode.modules.size;
    const matrix = qrCode.modules.data;
    const qrSize = Math.round(w * 0.49);
    const moduleSize = qrSize / matrixSize;
    const qrX = (w - qrSize) / 2;
    const qrY = (h - qrSize) / 2 - 35;
    const finderStarts = [
      [0, 0],
      [matrixSize - 7, 0],
      [0, matrixSize - 7],
    ];

    const isFinderModule = (row: number, col: number) =>
      finderStarts.some(([startCol, startRow]) =>
        col >= startCol && col < startCol + 7 &&
        row >= startRow && row < startRow + 7
      );

    // Draw data modules as crisp circular dots.
    ctx.save();
    ctx.fillStyle = '#ffffff';
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (!matrix[row * matrixSize + col] || isFinderModule(row, col)) continue;
        const centerX = qrX + (col + 0.5) * moduleSize;
        const centerY = qrY + (row + 0.5) * moduleSize;
        ctx.beginPath();
        ctx.arc(centerX, centerY, moduleSize * 0.36, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Inverted rounded finder patterns: white outer, black ring, white center.
    const drawFinder = (startCol: number, startRow: number) => {
      const x = qrX + startCol * moduleSize;
      const y = qrY + startRow * moduleSize;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x, y, moduleSize * 7, moduleSize * 7, moduleSize * 1.15);
      ctx.fill();

      ctx.fillStyle = '#050505';
      ctx.beginPath();
      ctx.roundRect(
        x + moduleSize, y + moduleSize,
        moduleSize * 5, moduleSize * 5, moduleSize * 0.8
      );
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(
        x + moduleSize * 2, y + moduleSize * 2,
        moduleSize * 3, moduleSize * 3, moduleSize * 0.55
      );
      ctx.fill();
    };

    drawFinder(0, 0);
    drawFinder(matrixSize - 7, 0);
    drawFinder(0, matrixSize - 7);
    ctx.restore();
  }

  // Email sits centered at the bottom of the card.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = '400 30px Arial, Helvetica, sans-serif';
  ctx.fillText(settings.email, w / 2, h - 82, w - 100);
};
