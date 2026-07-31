export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    {
      name: 'company_name',
      title: 'Nom de la société',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Numéro de Téléphone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Adresse Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresse physique',
      type: 'text',
    },
    {
      name: 'about_text',
      title: 'Texte de présentation (À Propos)',
      type: 'text',
    },
  ],
};
