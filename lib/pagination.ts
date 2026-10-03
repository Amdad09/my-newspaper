/** Reads ?page=… safely. Anything invalid becomes page 1. */
export function parsePage(value?: string) {
    const n = Number.parseInt(value ?? '1', 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
}

export function paginate(total: number, page: number, pageSize: number) {
    return {
        pages: Math.max(1, Math.ceil(total / pageSize)),
        offset: (page - 1) * pageSize,
    };
}
