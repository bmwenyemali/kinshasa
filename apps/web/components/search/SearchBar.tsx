"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  MapPin,
  Building2,
  FileText,
  Stethoscope,
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  placeholder = "Rechercher un service, lieu, commune...",
  autoFocus = false,
  onSearch,
  className = "",
  size = "md",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: suggestions, isLoading } = trpc.search.suggestions.useQuery(
    { query, limit: 6 },
    { enabled: query.length >= 2 },
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/recherche?q=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {
    text: string;
    type: string;
    id?: string;
  }) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);

    if (suggestion.type === "lieu" && suggestion.id) {
      router.push(`/lieux/${suggestion.id}`);
    } else if (suggestion.type === "commune" && suggestion.id) {
      router.push(`/communes/${suggestion.id}`);
    } else {
      router.push(`/recherche?q=${encodeURIComponent(suggestion.text)}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "lieu":
        return <MapPin className="w-4 h-4" />;
      case "commune":
        return <Building2 className="w-4 h-4" />;
      case "service":
        return <FileText className="w-4 h-4" />;
      case "zone_sante":
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const sizeClasses = {
    sm: "h-10 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (query.length >= 2) setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full pl-12 pr-12 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${sizeClasses[size]}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border shadow-lg overflow-hidden z-50 animate-fade-in">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-muted-foreground">
                      {getIcon(suggestion.type)}
                    </span>
                    <span className="flex-1 text-foreground">
                      {suggestion.text}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {suggestion.type.replace("_", " ")}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary/5 hover:bg-primary/10 transition-colors text-left text-primary font-medium"
                >
                  <Search className="w-4 h-4" />
                  Rechercher "{query}"
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-3 text-muted-foreground text-sm">
              Aucune suggestion trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}
