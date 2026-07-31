export default {
  name: 'project',
  title: 'Réalisations / Projets',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Catégorie d\'ouvrage',
      type: 'string',
      options: {
        list: [
          'Équipement public',
          'Bâtiment industriel',
          'Mixte bureaux / commerces',
          'Logement collectif',
          'Bâtiment tertiaire',
          'Habitat individuel',
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description détaillée',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Localisation (ex: Conakry, Kindia)',
      type: 'string',
    },
    {
      name: 'surface',
      title: 'Surface (ex: 1 200 m²)',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Durée des travaux (ex: 18 mois)',
      type: 'string',
    },
    {
      name: 'photo_before',
      title: 'Photo du chantier (Avant / En cours)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'photo_after',
      title: 'Photo de l\'ouvrage livré (Après)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
