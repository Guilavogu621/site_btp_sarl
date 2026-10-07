"use client";

import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Video as VideoIcon, X, Play, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { initialArticles, getArticles } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
}

export default function BlogPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadArticles() {
      try {
        const data = await getArticles();
        if (isMounted && Array.isArray(data)) {
          setArticles(data);
        }
      } catch (err) {
        console.error("Erreur de chargement des articles :", err);
      }
    }

    loadArticles();

    const handleUpdate = () => {
      loadArticles();
    };

    window.addEventListener("articles_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("articles_updated", handleUpdate);
    };
  }, []);

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    setActivePhotoIndex(0);
  };

  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="Espace Presse &amp; Technique"
        title="Actualités &amp; Publications BTP"
        description="Retrouvez les dernières informations sur nos chantiers, nos vidéos de projets, nos conseils d'ingénierie et la vie du Groupe."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#C4C6CE] text-[#5B6B7A] rounded-sm shadow-sm space-y-3">
            <h3 className="font-display font-bold text-[20px] text-[#0A2540]">
              Aucun article publié pour le moment
            </h3>
            <p className="font-sans text-[14px] text-[#5B6B7A] max-w-lg mx-auto">
              Les actualités, conseils d&apos;ingénierie et suivis de chantiers du bureau d&apos;études seront bientôt publiés par notre équipe.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {articles.map((article) => {
              const youtubeEmbed = getYouTubeEmbedUrl(article.video_url);
              const isVideoFile = article.video_url && !youtubeEmbed;
              const hasVideo = Boolean(article.video_url);
              const articlePhotos = (article.photos && article.photos.length > 0)
                ? article.photos
                : (article.image ? [article.image] : ["/img/logo.png"]);
              const hasMultiplePhotos = articlePhotos.length > 1;

              return (
                <div
                  key={article.id}
                  className="card-stitch flex flex-col h-full group cursor-pointer"
                  onClick={() => handleOpenArticle(article)}
                >
                  {/* Media Header */}
                  <div className="h-64 bg-[#0A2540] flex items-center justify-center relative overflow-hidden border-b border-[#C4C6CE] blueprint-grid-dark">
                    {youtubeEmbed ? (
                      <iframe
                        src={youtubeEmbed}
                        title={article.title}
                        className="w-full h-full object-cover border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : isVideoFile ? (
                      <video
                        src={article.video_url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={articlePhotos[0] || "/img/logo.png"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {hasMultiplePhotos && (
                        <div className="bg-[#0A2540]/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-[#00C2FF]/40 flex items-center gap-1.5 backdrop-blur-xs">
                          <ImageIcon className="w-3.5 h-3.5 text-[#00C2FF]" />
                          <span>{articlePhotos.length} photos</span>
                        </div>
                      )}
                      {hasVideo && (
                        <div className="bg-[#00C2FF] text-[#0A2540] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                          <VideoIcon className="w-3.5 h-3.5 fill-[#0A2540]" />
                          <span>Vidéo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[#295EA8] font-semibold uppercase mb-3 bg-[#F1F4F7] px-2.5 py-1 border border-[#C4C6CE] rounded-xs inline-flex">
                        <Calendar className="w-3.5 h-3.5 text-[#00C2FF]" />
                        <span>{article.published_at}</span>
                      </div>

                      <h2 className="font-display font-bold text-[22px] text-[#0A2540] leading-snug mb-4 group-hover:text-[#295EA8] transition-colors">
                        {article.title}
                      </h2>

                      <p className="font-sans text-[15px] text-[#334155] leading-relaxed mb-6 line-clamp-3">
                        {article.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C4C6CE] mt-auto">
                      <span className="inline-flex items-center font-display font-semibold text-[13px] uppercase tracking-wider text-[#0A2540] group-hover:text-[#295EA8] transition-colors">
                        <span>{hasVideo ? "Regarder la vidéo & lire" : "Consulter les photos & lire"}</span>
                        <ArrowRight className="w-4 h-4 ml-2 text-[#00C2FF] transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (() => {
        const modalPhotos = (selectedArticle.photos && selectedArticle.photos.length > 0)
          ? selectedArticle.photos
          : (selectedArticle.image ? [selectedArticle.image] : ["/img/logo.png"]);
        const youtubeEmbed = getYouTubeEmbedUrl(selectedArticle.video_url);

        return (
          <div
            className="fixed inset-0 z-50 bg-[#0A2540]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-white border border-[#1E56A0]/40 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Media */}
              <div className="relative bg-[#0A2540] min-h-[300px] max-h-[480px] flex items-center justify-center overflow-hidden">
                {youtubeEmbed ? (
                  <iframe
                    src={youtubeEmbed}
                    title={selectedArticle.title}
                    className="w-full h-80 sm:h-96 object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : selectedArticle.video_url && activePhotoIndex === -1 ? (
                  <video
                    src={selectedArticle.video_url}
                    controls
                    autoPlay
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <img
                    src={modalPhotos[activePhotoIndex] || modalPhotos[0] || "/img/logo.png"}
                    alt={selectedArticle.title}
                    className="w-full max-h-[480px] object-contain bg-[#0A2540]"
                  />
                )}

                {/* Navigation Précédent / Suivant si galerie */}
                {modalPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : modalPhotos.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A2540]/80 hover:bg-[#00C2FF] text-white hover:text-[#0A2540] rounded-full transition-colors backdrop-blur-xs shadow-lg"
                      aria-label="Photo précédente"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((prev) => (prev < modalPhotos.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A2540]/80 hover:bg-[#00C2FF] text-white hover:text-[#0A2540] rounded-full transition-colors backdrop-blur-xs shadow-lg"
                      aria-label="Photo suivante"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#0A2540]/85 px-3 py-1 rounded-full text-[11px] font-mono text-[#00C2FF] border border-[#00C2FF]/30 backdrop-blur-xs">
                      Photo {activePhotoIndex + 1} / {modalPhotos.length}
                    </div>
                  </>
                )}

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-[#0A2540]/80 hover:bg-[#00C2FF] hover:text-[#0A2540] text-white rounded-full transition-colors shadow-lg z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Barre de vignettes si galerie multi-photos */}
              {modalPhotos.length > 1 && (
                <div className="bg-[#081B2E] p-3 flex gap-2 overflow-x-auto border-b border-slate-700">
                  {modalPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-16 h-12 rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                        activePhotoIndex === idx ? "border-[#00C2FF] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4 max-h-[40vh] overflow-y-auto">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#295EA8] font-semibold uppercase bg-[#F1F4F7] px-3 py-1 border border-[#C4C6CE] rounded-xs inline-flex">
                  <Calendar className="w-3.5 h-3.5 text-[#00C2FF]" />
                  <span>Publié le {selectedArticle.published_at}</span>
                </div>

                <h2 className="font-display font-bold text-[24px] sm:text-[28px] text-[#0A2540] leading-snug">
                  {selectedArticle.title}
                </h2>

                <p className="font-sans text-[16px] text-[#334155] leading-relaxed whitespace-pre-line pt-2 border-t border-slate-200">
                  {selectedArticle.content}
                </p>

                <div className="pt-6 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
