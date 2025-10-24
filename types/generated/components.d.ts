import type { Schema, Struct } from '@strapi/strapi';

export interface PdfPdf extends Struct.ComponentSchema {
  collectionName: 'components_pdf_pdfs';
  info: {
    displayName: 'PDF';
    icon: 'folder';
  };
  attributes: {
    pdf: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    titre: Schema.Attribute.String;
  };
}

export interface SectionsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_sections';
  info: {
    displayName: 'Section';
    icon: 'layer';
  };
  attributes: {
    contenu: Schema.Attribute.Blocks;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titre: Schema.Attribute.String;
  };
}

export interface SharedLien extends Struct.ComponentSchema {
  collectionName: 'components_shared_liens';
  info: {
    displayName: 'Lien';
    icon: 'globe';
  };
  attributes: {
    nom: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface TableauTableau extends Struct.ComponentSchema {
  collectionName: 'components_tableau_tableaus';
  info: {
    displayName: 'Tableau';
  };
  attributes: {
    commentaire: Schema.Attribute.String;
    dates: Schema.Attribute.String;
    dimanche1: Schema.Attribute.String;
    dimanche2: Schema.Attribute.String;
    jeudi1: Schema.Attribute.String;
    jeudi2: Schema.Attribute.String;
    lundi1: Schema.Attribute.String;
    lundi2: Schema.Attribute.String;
    mardi1: Schema.Attribute.String;
    mardi2: Schema.Attribute.String;
    mercredi1: Schema.Attribute.String;
    mercredi2: Schema.Attribute.String;
    samedi1: Schema.Attribute.String;
    samedi2: Schema.Attribute.String;
    vendredi1: Schema.Attribute.String;
    vendredi2: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pdf.pdf': PdfPdf;
      'sections.section': SectionsSection;
      'shared.lien': SharedLien;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'tableau.tableau': TableauTableau;
    }
  }
}
