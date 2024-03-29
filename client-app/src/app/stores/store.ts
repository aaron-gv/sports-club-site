import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import EventoStore from "./eventoStore";
import UserStore from "./userStore";
import NoticiaStore from './noticiaStore';
import GalleryStore from "./galleryStore";
import ImageStore from "./imageStore";
import PatrocinadorStore from "./patrocinadorStore";

interface Store {
    eventoStore: EventoStore;
    commonStore: CommonStore;
    userStore: UserStore;
    noticiaStore: NoticiaStore;
    galleryStore: GalleryStore;
    imageStore: ImageStore;
    patrocinadorStore: PatrocinadorStore;
}

export const store: Store = {
    eventoStore: new EventoStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    noticiaStore: new NoticiaStore(),
    galleryStore: new GalleryStore(),
    imageStore: new ImageStore(),
    patrocinadorStore: new PatrocinadorStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}