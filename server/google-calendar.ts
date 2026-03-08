/**
 * google-calendar.ts
 * Helper for Google Calendar API integration.
 * Uses OAuth2 with a stored refresh token to create/delete events
 * and check availability for each clinic unit.
 */
import { google } from "googleapis";
import { ENV } from "./_core/env";

export type Unit = "Lapa" | "Santana" | "São Miguel" | "Tatuapé" | "Guarulhos";

/** Maps each unit to its Google Calendar ID (set via env vars after OAuth setup) */
export function getCalendarId(unit: Unit): string | null {
  const map: Record<Unit, string> = {
    Lapa: ENV.gcalLapa,
    Santana: ENV.gcalSantana,
    "São Miguel": ENV.gcalSaoMiguel,
    Tatuapé: ENV.gcalTatuape,
    Guarulhos: ENV.gcalGuarulhos,
  };
  const id = map[unit];
  return id || null;
}

/** Creates an authenticated Google Calendar client using the stored refresh token */
export function getCalendarClient() {
  if (!ENV.googleClientId || !ENV.googleClientSecret || !ENV.googleRefreshToken) {
    return null;
  }
  const auth = new google.auth.OAuth2(
    ENV.googleClientId,
    ENV.googleClientSecret,
    ENV.googleRedirectUri
  );
  auth.setCredentials({ refresh_token: ENV.googleRefreshToken });
  return google.calendar({ version: "v3", auth });
}

/** Returns true if Google Calendar integration is fully configured */
export function isCalendarConfigured(): boolean {
  return !!(
    ENV.googleClientId &&
    ENV.googleClientSecret &&
    ENV.googleRefreshToken &&
    (ENV.gcalLapa || ENV.gcalSantana || ENV.gcalSaoMiguel || ENV.gcalTatuape || ENV.gcalGuarulhos)
  );
}

/**
 * Creates a Google Calendar event for an appointment.
 * Returns the event ID if successful, null otherwise.
 */
export async function createCalendarEvent(params: {
  unit: Unit;
  patientName: string;
  patientPhone: string;
  patientEmail: string | null;
  healthPlan: string;
  specialty: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentHour: number; // 9-17
  appointmentMinute?: number; // 0 or 30
  notes?: string | null;
}): Promise<string | null> {
  const calendar = getCalendarClient();
  if (!calendar) return null;

  const calendarId = getCalendarId(params.unit);
  if (!calendarId) return null;

  // Build start/end times in São Paulo timezone (UTC-3)
  const startMin = params.appointmentMinute ?? 0;
  const startMinStr = String(startMin).padStart(2, "0");
  const endTotalMin = startMin + 30;
  const endHour = endTotalMin >= 60 ? params.appointmentHour + 1 : params.appointmentHour;
  const endMinStr = String(endTotalMin % 60).padStart(2, "0");
  const startDateTime = `${params.appointmentDate}T${String(params.appointmentHour).padStart(2, "0")}:${startMinStr}:00-03:00`;
  const endDateTime = `${params.appointmentDate}T${String(endHour).padStart(2, "0")}:${endMinStr}:00-03:00`;

  const description = [
    `📋 Especialidade: ${params.specialty}`,
    `📞 Telefone: ${params.patientPhone}`,
    params.patientEmail ? `📧 Email: ${params.patientEmail}` : null,
    `🏥 Convênio: ${params.healthPlan}`,
    params.notes ? `📝 Observações: ${params.notes}` : null,
    ``,
    `Agendado via site institutodrudiealmeida.com.br`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `${params.patientName} — ${params.specialty}`,
        description,
        start: { dateTime: startDateTime, timeZone: "America/Sao_Paulo" },
        end: { dateTime: endDateTime, timeZone: "America/Sao_Paulo" },
        colorId: "2", // Sage green
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // 1 day before
            { method: "popup", minutes: 60 }, // 1 hour before
          ],
        },
      },
    });
    return response.data.id ?? null;
  } catch (err) {
    console.error("[Google Calendar] Failed to create event:", err);
    return null;
  }
}

/**
 * Deletes a Google Calendar event by event ID.
 */
export async function deleteCalendarEvent(unit: Unit, eventId: string): Promise<boolean> {
  const calendar = getCalendarClient();
  if (!calendar) return false;

  const calendarId = getCalendarId(unit);
  if (!calendarId) return false;

  try {
    await calendar.events.delete({ calendarId, eventId });
    return true;
  } catch (err) {
    console.error("[Google Calendar] Failed to delete event:", err);
    return false;
  }
}

/**
 * Returns a list of busy time slots for a unit on a given date.
 * Used to cross-check with the database.
 */
export async function getBusySlots(unit: Unit, date: string): Promise<number[]> {
  const calendar = getCalendarClient();
  if (!calendar) return [];

  const calendarId = getCalendarId(unit);
  if (!calendarId) return [];

  const timeMin = `${date}T00:00:00-03:00`;
  const timeMax = `${date}T23:59:59-03:00`;

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items ?? [];
    const busyHours: number[] = [];

    for (const event of events) {
      if (event.status === "cancelled") continue;
      const start = event.start?.dateTime;
      if (!start) continue;
      const hour = new Date(start).getHours();
      busyHours.push(hour);
    }

    return busyHours;
  } catch (err) {
    console.error("[Google Calendar] Failed to get busy slots:", err);
    return [];
  }
}

/**
 * Lists all calendars accessible to the authenticated account.
 * Used during setup to get calendar IDs.
 */
export async function listCalendars(): Promise<Array<{ id: string; summary: string }>> {
  const calendar = getCalendarClient();
  if (!calendar) return [];

  try {
    const response = await calendar.calendarList.list();
    return (response.data.items ?? []).map((c) => ({
      id: c.id ?? "",
      summary: c.summary ?? "",
    }));
  } catch (err) {
    console.error("[Google Calendar] Failed to list calendars:", err);
    return [];
  }
}

/**
 * Creates a new calendar for a unit and returns its ID.
 * Called during initial setup.
 */
export async function createUnitCalendar(unitName: string): Promise<string | null> {
  const calendar = getCalendarClient();
  if (!calendar) return null;

  try {
    const response = await calendar.calendars.insert({
      requestBody: {
        summary: `Drudi e Almeida — ${unitName}`,
        description: `Agenda de consultas da unidade ${unitName} — Drudi e Almeida Clínicas Oftalmológicas`,
        timeZone: "America/Sao_Paulo",
      },
    });
    return response.data.id ?? null;
  } catch (err) {
    console.error("[Google Calendar] Failed to create calendar:", err);
    return null;
  }
}
