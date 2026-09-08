import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languages = {
    sr: 'Srpski',
    en: 'English',
    de: 'Deutsch',
} as const;

export type Language = keyof typeof languages;

const resources = {
    sr: {
        translation: {

            tabs: { reports: 'Izveštaji', clients: 'Klijenti', profile: 'Profil' },
            reports: {
                pending: 'Na čekanju',
                accepted: 'Prihvaćeni',
                declined: 'Odbijeni',
                empty: 'Nema izveštaja ovog statusa.',
                create: 'Kreiraj upit za djubre',

            },
            post: {
                title: 'Prijava građanina',
                defaultTitle: 'Prijava otpada',
                description: 'Opis prijave',
                descriptionPlaceholder: 'Opišite gde se otpad nalazi...',
                instructions: 'Uputstvo',
                takePhoto: 'Slikaj djubre',
                takeBagPhoto: 'Slikaj djubre u kesi',
                submit: 'Pošalji upit',
                noPhotos: 'Nema priloženih fotografija',
                pending: 'Na čekanju',
                accepted: 'Prihvaćeno',
                declined: 'Odbijeno',
                descriptionRequired: 'Opis prijave je obavezan pre slanja.',
            },
            clients: {
                title: 'Klijenti',
                subtitle: 'Pregledajte partnere i vrednost popusta koji dobijate za svaki poen.',
                reward: 'Program nagrađivanja',
                discount: 'Popust po poenu',
                undefined: 'Nije definisan',
                empty: 'Još nema klijenata',
                loading: 'Učitavanje klijenata...',
                unavailable: 'Klijenti trenutno nisu dostupni',
                retry: 'Pokušaj ponovo',
            },
            profile: { email: 'Email adresa', points: 'Broj poena', language: 'Jezik', signOut: 'Odjavi se' },
            common: { cleanCity: 'Clean City', citizenReport: 'Prijava građanina' },
        },
    },
    en: {
        translation: {
            tabs: { reports: 'Reports', clients: 'Clients', profile: 'Profile' },
            reports: {
                pending: 'Pending', accepted: 'Accepted', declined: 'Declined',
                empty: 'No reports with this status.', create: 'Create waste report',
            },
            post: {
                descriptionRequired: 'The report description is required before submitting.',
                title: 'Citizen report', defaultTitle: 'Waste report', description: 'Report description',
                descriptionPlaceholder: 'Describe where the waste is...', instructions: 'Instructions',
                takePhoto: 'Photograph waste', takeBagPhoto: 'Photograph bagged waste', submit: 'Submit report',
                noPhotos: 'No photos attached', pending: 'Pending', accepted: 'Accepted', declined: 'Declined',
            },
            clients: {
                title: 'Clients', subtitle: 'View partners and the discount value earned for each point.',
                reward: 'Rewards program', discount: 'Discount per point', undefined: 'Not defined',
                empty: 'No clients yet', loading: 'Loading clients...', unavailable: 'Clients are unavailable', retry: 'Try again',
            },
            profile: { email: 'Email address', points: 'Points', language: 'Language', signOut: 'Sign out' },
            common: { cleanCity: 'Clean City', citizenReport: 'Citizen report' },
        },
    },
    de: {
        translation: {
            tabs: { reports: 'Meldungen', clients: 'Kunden', profile: 'Profil' },
            reports: {
                pending: 'Ausstehend', accepted: 'Angenommen', declined: 'Abgelehnt',
                empty: 'Keine Meldungen mit diesem Status.', create: 'Abfall melden',
            },
            post: {
                descriptionRequired: 'Die Beschreibung der Meldung ist erforderlich, bevor Sie sie absenden.',
                title: 'Bürgermeldung', defaultTitle: 'Abfallmeldung', description: 'Beschreibung',
                descriptionPlaceholder: 'Beschreiben Sie, wo sich der Abfall befindet...', instructions: 'Anleitung',
                takePhoto: 'Abfall fotografieren', takeBagPhoto: 'Eingepackten Abfall fotografieren', submit: 'Meldung senden',
                noPhotos: 'Keine Fotos angehängt', pending: 'Ausstehend', accepted: 'Angenommen', declined: 'Abgelehnt',
            },
            clients: {
                title: 'Kunden', subtitle: 'Partner und den Rabattwert pro Punkt anzeigen.',
                reward: 'Prämienprogramm', discount: 'Rabatt pro Punkt', undefined: 'Nicht festgelegt',
                empty: 'Noch keine Kunden', loading: 'Kunden werden geladen...', unavailable: 'Kunden sind derzeit nicht verfügbar', retry: 'Erneut versuchen',
            },
            profile: { email: 'E-Mail-Adresse', points: 'Punkte', language: 'Sprache', signOut: 'Abmelden' },
            common: { cleanCity: 'Clean City', citizenReport: 'Bürgermeldung' },
        },
    },
} as const;

void i18n.use(initReactI18next).init({
    resources,
    lng: 'sr',
    fallbackLng: 'sr',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
});

export const loadSavedLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('clean-city-language');
    if (savedLanguage && savedLanguage in languages) {
        await i18n.changeLanguage(savedLanguage);
    }
};

export const changeLanguage = async (language: Language) => {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('clean-city-language', language);
};

export default i18n;
