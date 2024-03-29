import {Gallery} from "./gallery";
import { ImageDto } from "./image";
import { Profile } from "./profile";

export interface Evento {
    id: string;
    title: string;
    url: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    portraitUrl?: string;
    portrait?: ImageDto;
    host?:Profile;
    appUserId: string;
    asistentes?: Profile[];
    galleries?: Gallery[] | undefined;
}

export class Evento implements Evento {
    constructor(init?: EventoFormValues) {
        Object.assign(this, init);
    }
}

export class EventoFormValues {
    id?: string = undefined;
    url: string ='';
    title: string = '';
    category: string ='';
    description: string = '';
    startDate: Date | null = null;
    endDate: Date | null = null;
    city: string = '';
    venue: string = '';
    appUserId: string = '';
    constructor(evento?: EventoFormValues) {
        if (evento) {
            this.id = evento.id;
            this.url = evento.url;
            this.title = evento.title;
            this.description = evento.description;
            this.category = evento.category;
            this.startDate = evento.startDate;
            this.endDate = evento.endDate;
            this.venue = evento.venue;
            this.city = evento.city;
            this.appUserId = evento.appUserId;
        }
    }
}