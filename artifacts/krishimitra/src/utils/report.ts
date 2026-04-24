import jsPDF from "jspdf";
import type { LangCode } from "@/i18n/translations";
import { t } from "@/i18n/translations";
import type { Activity, FieldMetrics, Profile, Task } from "@/store/AppContext";

// Note: jsPDF's default fonts only support Latin characters. To keep the PDF
// readable in non-Latin languages, we render headings in BOTH the selected
// language (if Latin / English) and always include English labels in
// parentheses. Native script renders only when supported by the system.

function safeText(s: string): string {
  // jsPDF default font (Helvetica) supports only WinAnsi. For non-latin
  // characters, jsPDF will render them as boxes. To avoid that, we keep
  // English labels alongside the localized title in the report header.
  return s.replace(/[\u0900-\u0DFF\u0600-\u06FF]/g, "?");
}

export function generateFarmReport(
  lang: LangCode,
  profile: Profile,
  metrics: FieldMetrics,
  tasks: Task[],
  activities: Activity[],
): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 50;

  // Header
  doc.setFillColor(34, 139, 34);
  doc.rect(0, 0, pageWidth, 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("KrishiMitra AI", 40, 35);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(t("reportTitle", lang)) + " (Farm Analytics Report)", 40, 55);

  y = 100;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(
    `${safeText(t("generatedOn", lang))} (Generated): ${new Date().toLocaleString()}`,
    40,
    y,
  );
  y += 25;

  // Profile section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text("Farmer Profile", 40, y);
  y += 18;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const profileLines = [
    `Name: ${profile.name}`,
    `Village: ${profile.village}, State: ${profile.state}`,
    `Farm Size: ${profile.farmSize} acres`,
    `Crop: ${profile.cropType}, Soil: ${profile.soilType}, Irrigation: ${profile.irrigationType}`,
    `Language: ${lang.toUpperCase()}`,
  ];
  profileLines.forEach((line) => {
    doc.text(line, 40, y);
    y += 16;
  });
  y += 10;

  // Crop Analytics
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text(safeText(t("cropAnalytics", lang)) + " (Crop Analytics)", 40, y);
  y += 20;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const cropMetrics = [
    [`Farm Health`, metrics.health.toUpperCase()],
    [`Expected Yield`, `${metrics.expectedYield} quintals`],
    [`Current Yield`, `${metrics.currentYield} quintals`],
    [`Yield Achievement`, `${Math.round((metrics.currentYield / metrics.expectedYield) * 100)}%`],
    [`Days to Harvest`, `${metrics.daysToHarvest} days`],
    [`Soil Moisture`, `${metrics.soilMoisture}%`],
    [`Temperature`, `${metrics.temperature}°C`],
    [`Humidity`, `${metrics.humidity}%`],
  ];

  // Table-like layout
  cropMetrics.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label as string, 40, y);
    doc.setFont("helvetica", "normal");
    doc.text(value as string, 250, y);
    y += 16;
  });
  y += 10;

  // Yield bar
  const barX = 40;
  const barY = y;
  const barW = pageWidth - 80;
  const barH = 12;
  const pct = Math.min(1, metrics.currentYield / metrics.expectedYield);
  doc.setDrawColor(180);
  doc.setFillColor(230, 230, 230);
  doc.roundedRect(barX, barY, barW, barH, 4, 4, "F");
  doc.setFillColor(34, 139, 34);
  doc.roundedRect(barX, barY, barW * pct, barH, 4, 4, "F");
  y += 30;

  // Activities
  if (y > 700) {
    doc.addPage();
    y = 50;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text(safeText(t("activitiesSummary", lang)) + " (Activities Summary)", 40, y);
  y += 20;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const counts: Record<string, number> = {};
  activities.forEach((a) => {
    counts[a.type] = (counts[a.type] || 0) + 1;
  });

  const summary = [
    `Irrigation events: ${counts.irrigation || metrics.irrigationCount}`,
    `Fertilizer applications: ${counts.fertilizer || metrics.fertilizerCount}`,
    `Pest control actions: ${counts.pestControl || metrics.pestControlCount}`,
    `Total activities logged: ${activities.length}`,
  ];
  summary.forEach((line) => {
    doc.text(line, 40, y);
    y += 16;
  });
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Recent Activities:", 40, y);
  y += 18;
  doc.setFont("helvetica", "normal");

  activities.slice(0, 10).forEach((a) => {
    if (y > 760) {
      doc.addPage();
      y = 50;
    }
    const date = new Date(a.date).toLocaleDateString();
    doc.text(`- [${date}] ${a.type}: ${safeText(a.note.en)}`, 40, y);
    y += 14;
  });

  y += 10;

  // Tasks
  if (y > 700) {
    doc.addPage();
    y = 50;
  }
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text("Tasks Status", 40, y);
  y += 18;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const completed = tasks.filter((t) => t.done).length;
  doc.text(`Completed: ${completed} / ${tasks.length}`, 40, y);
  y += 22;

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      `KrishiMitra AI - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 20,
      { align: "center" },
    );
  }

  return doc;
}

export function downloadReport(
  lang: LangCode,
  profile: Profile,
  metrics: FieldMetrics,
  tasks: Task[],
  activities: Activity[],
) {
  const doc = generateFarmReport(lang, profile, metrics, tasks, activities);
  const filename = `KrishiMitra_Report_${profile.name.replace(/\s+/g, "_")}_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;
  doc.save(filename);
}
