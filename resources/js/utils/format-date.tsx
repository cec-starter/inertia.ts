export function formatDate(
    date: string | Date,
    options: Intl.DateTimeFormatOptions = {}
) {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        dateStyle: "medium",
        timeStyle: "short",
        ...options,
    };

    return new Intl.DateTimeFormat("id-ID", defaultOptions).format(
        new Date(date)
    );
}

// Format relative time (e.g. "2 hours ago")
export function formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals = {
        tahun: 31536000,
        bulan: 2592000,
        minggu: 604800,
        hari: 86400,
        jam: 3600,
        menit: 60,
        detik: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);

        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? "" : ""} yang lalu`;
        }
    }

    return "Baru saja";
}

// Format untuk tanggal saja
export function formatDateOnly(date: string | Date): string {
    return formatDate(date, {
        dateStyle: "long",
        timeStyle: undefined,
    });
}

// Format untuk waktu saja
export function formatTimeOnly(date: string | Date): string {
    return formatDate(date, {
        dateStyle: undefined,
        timeStyle: "short",
    });
}

// Format custom dengan pattern
export function formatCustomDate(date: string | Date, pattern: string): string {
    const d = new Date(date);

    const replacements: Record<string, () => string> = {
        YYYY: () => d.getFullYear().toString(),
        MM: () => String(d.getMonth() + 1).padStart(2, "0"),
        DD: () => String(d.getDate()).padStart(2, "0"),
        HH: () => String(d.getHours()).padStart(2, "0"),
        mm: () => String(d.getMinutes()).padStart(2, "0"),
        ss: () => String(d.getSeconds()).padStart(2, "0"),
    };

    return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) =>
        replacements[match]()
    );
}
