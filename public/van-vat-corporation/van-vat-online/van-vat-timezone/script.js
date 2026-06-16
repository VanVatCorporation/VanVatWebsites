const canvas = document.getElementById("timeCanvas");
const ctx = canvas.getContext("2d");
const tz1 = "Asia/Ho_Chi_Minh";
const tz2 = "Australia/Adelaide";

let smoothX1 = 0;
let smoothX2 = 0;

function getTimeInZone(tz) {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: tz }));
}

function drawBookmarkPointer(x, y, color, label) {
  ctx.fillStyle = color;
  const w = 8, h = 16;
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y - h);
  ctx.closePath();
  ctx.fill();

  // Label below
  ctx.font = "bold 12px Inter";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + 18);
}

function drawIcon(x, y, isDay) {
  ctx.font = "24px Inter";
  ctx.textAlign = "center";
  ctx.fillText(isDay ? "☀️" : "🌙", x, y - 28);
}

function isDaytime(date) {
  const h = date.getHours();
  return h >= 6 && h < 18;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function drawTimeline() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Bar Y positions (increased spacing)
  const y1 = height / 3 - 20;
  const y2 = (2 * height) / 3 + 20;

  // Draw each bar
  function drawBar(y, color1, color2) {
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, "#001a4d");
    grad.addColorStop(0.25, "#0077ff");
    grad.addColorStop(0.5, "#80d0ff");
    grad.addColorStop(0.75, "#0077ff");
    grad.addColorStop(1, "#001a4d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 6, width, 12);

    // Ruler ticks
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1;
    ctx.font = "10px Inter";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";

    for (let m = 0; m <= 24 * 60; m += 15) {
      const x = (m / (24 * 60)) * width;
      const isHour = m % 60 === 0;
      const tickHeight = isHour ? 10 : 5;

      ctx.beginPath();
      ctx.moveTo(x, y - tickHeight);
      ctx.lineTo(x, y + tickHeight);
      ctx.stroke();

      if (isHour) {
        const hour = (m / 60) % 24;
        ctx.fillText(hour.toString().padStart(2, "0") + ":00", x, y - 14);
      }
    }
  }

  drawBar(y1, "#00b4ff", "#0077ff"); // Hanoi
  drawBar(y2, "#ffb700", "#ff8800"); // Adelaide

  // Current time → position
  const timeHanoi = getTimeInZone(tz1);
  const timeAdel = getTimeInZone(tz2);
  const totalMins1 = timeHanoi.getHours() * 60 + timeHanoi.getMinutes() + timeHanoi.getSeconds() / 60;
  const totalMins2 = timeAdel.getHours() * 60 + timeAdel.getMinutes() + timeAdel.getSeconds() / 60;

  const targetX1 = (totalMins1 / (24 * 60)) * width;
  const targetX2 = (totalMins2 / (24 * 60)) * width;

  // Smooth interpolation
  smoothX1 = lerp(smoothX1, targetX1, 0.1);
  smoothX2 = lerp(smoothX2, targetX2, 0.1);

  // Draw connector (vertical + diagonal)
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  // small vertical up from Hanoi bookmark
  ctx.moveTo(smoothX1, y1 + 14);
  ctx.lineTo(smoothX1, y1 + 26);
  // small vertical down from Adelaide bookmark
  ctx.moveTo(smoothX2, y2 - 14);
  ctx.lineTo(smoothX2, y2 - 26);
  // diagonal between them
  ctx.moveTo(smoothX1, y1 + 26);
  ctx.lineTo(smoothX2, y2 - 26);
  ctx.stroke();

  // Sun/Moon icons above bars
  drawIcon(smoothX1, y1, isDaytime(timeHanoi));
  drawIcon(smoothX2, y2, isDaytime(timeAdel));

  // Bookmarks below bars
  drawBookmarkPointer(smoothX1, y1 + 20, "#00b4ff", "Hà Nội");
  drawBookmarkPointer(smoothX2, y2 + 20, "#ffb700", "Adelaide");

  // Current time labels
  ctx.font = "bold 13px Inter";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  const fmt = t => t.toTimeString().slice(0,5);
  ctx.fillText(fmt(timeHanoi), smoothX1, y1 + 52);
  ctx.fillText(fmt(timeAdel), smoothX2, y2 + 52);
}

function animate() {
  drawTimeline();
  requestAnimationFrame(animate);
}

animate();
