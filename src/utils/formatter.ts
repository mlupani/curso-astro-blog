
export class Formatter {

    static formateDate(date: Date): string {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(new Date(date));
    }

}