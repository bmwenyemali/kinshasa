"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  Heart,
  Clock,
  Phone,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@kinservices/ui";
import {
  LIEU_TYPE_LABELS,
  LIEU_TYPE_ICONS,
  formatDistance,
} from "@kinservices/ui";

interface ServiceCardProps {
  id: string;
  nom: string;
  type: string;
  commune?: string | null;
  adresse?: string | null;
  averageRating?: number | null;
  avisCount?: number;
  distance?: number;
  verified?: boolean;
  featured?: boolean;
  services?: Array<{ nomService: string }>;
  onClick?: () => void;
}

export function ServiceCard({
  id,
  nom,
  type,
  commune,
  adresse,
  averageRating,
  avisCount = 0,
  distance,
  verified = false,
  featured = false,
  services = [],
  onClick,
}: ServiceCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite toggle with API
  };

  return (
    <Link href={`/lieux/${id}`} onClick={onClick}>
      <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-4 group">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
            {LIEU_TYPE_ICONS[type] || "📍"}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {nom}
                </h3>
                {verified && (
                  <Badge variant="verified" className="flex-shrink-0">
                    <BadgeCheck className="w-3 h-3" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <button
                onClick={handleFavoriteClick}
                className="p-1.5 rounded-full hover:bg-muted transition-colors flex-shrink-0"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorited
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {commune || "Kinshasa"}
              </span>
              {distance !== undefined && (
                <span className="text-primary font-medium">
                  {formatDistance(distance)}
                </span>
              )}
            </div>

            {/* Rating */}
            {averageRating !== null && averageRating !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({avisCount} avis)
                </span>
              </div>
            )}

            {/* Services preview */}
            {services.length > 0 && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {service.nomService}
                  </Badge>
                ))}
                {services.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{services.length - 3} autres
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}

// Compact version for lists
export function ServiceCardCompact({
  id,
  nom,
  type,
  commune,
  averageRating,
}: Pick<
  ServiceCardProps,
  "id" | "nom" | "type" | "commune" | "averageRating"
>) {
  return (
    <Link href={`/lieux/${id}`}>
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all group">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
          {LIEU_TYPE_ICONS[type] || "📍"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {nom}
          </p>
          <p className="text-xs text-muted-foreground">
            {commune || "Kinshasa"}
          </p>
        </div>
        {averageRating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
