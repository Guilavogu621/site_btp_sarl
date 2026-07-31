export default {
  name: 'article',
  title: 'Actualités & Presse',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de l\'article',
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
      name: 'published_at',
      title: 'Date de publication',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image d\'illustration',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Contenu de l\'article',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
};
