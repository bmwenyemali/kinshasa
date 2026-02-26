// Shared types for the web app to avoid implicit any errors

export interface CommuneWithStats {
  id: string;
  name: string;
  description?: string | null;
  population?: number | null;
  superficie?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  lieuxCount: number;
  _count: {
    lieux: number;
    quartiers: number;
  };
}

export interface ZoneSanteWithStats {
  id: string;
  name: string;
  description?: string | null;
  communeResponsable?: string | null;
  population?: number | null;
  nombreAiresSante?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  _count: {
    lieux: number;
  };
}

export interface LieuBase {
  id: string;
  nom: string;
  type: string;
  adresse?: string | null;
  telephone?: string | null;
  email?: string | null;
  siteWeb?: string | null;
  verified: boolean;
  featured?: boolean;
  latitude?: number | null;
  longitude?: number | null;
  commune?: {
    id: string;
    name: string;
  } | null;
  zoneSante?: {
    id: string;
    name: string;
  } | null;
  servicesProposed: { nomService: string }[];
  _count: {
    avis: number;
    servicesProposed?: number;
  };
}

export interface ServicePropose {
  id: string;
  nomService: string;
  description?: string | null;
  categorie: string;
  prixOfficiel?: number | null;
  devise?: string | null;
  delai?: string | null;
  documentsRequis?: string[];
  procedure?: string | null;
}

export interface Avis {
  id: string;
  userName?: string | null;
  note: number;
  commentaire?: string | null;
  dateExperience?: Date | null;
  approved: boolean;
  createdAt: Date;
}

export interface Quartier {
  id: string;
  name: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface Alerte {
  id: string;
  titre: string;
  message: string;
  type: string;
  dateDebut: Date;
  dateFin?: Date | null;
  actif: boolean;
}
