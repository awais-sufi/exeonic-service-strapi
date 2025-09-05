import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsButton extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsClicklink extends Struct.ComponentSchema {
  collectionName: 'components_components_clicklinks';
  info: {
    displayName: 'clicklink';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsFaq extends Struct.ComponentSchema {
  collectionName: 'components_components_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.String;
  };
}

export interface ComponentsHeader extends Struct.ComponentSchema {
  collectionName: 'components_components_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    button: Schema.Attribute.Component<'components.button', true>;
    link: Schema.Attribute.Component<'components.menulink', true>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ComponentsLogolink extends Struct.ComponentSchema {
  collectionName: 'components_components_logolinks';
  info: {
    displayName: 'logolink';
  };
  attributes: {
    link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ComponentsMenulink extends Struct.ComponentSchema {
  collectionName: 'components_components_menulinks';
  info: {
    displayName: 'menulink';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsProvide extends Struct.ComponentSchema {
  collectionName: 'components_components_provides';
  info: {
    displayName: 'provide';
  };
  attributes: {
    heading: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    paragraph: Schema.Attribute.Text;
  };
}

export interface ComponentsSocailLink extends Struct.ComponentSchema {
  collectionName: 'components_components_socail_links';
  info: {
    displayName: 'SocailLink';
  };
  attributes: {
    logoText: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsSolution extends Struct.ComponentSchema {
  collectionName: 'components_components_solutions';
  info: {
    displayName: 'solution';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    subHeading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.button': ComponentsButton;
      'components.clicklink': ComponentsClicklink;
      'components.faq': ComponentsFaq;
      'components.header': ComponentsHeader;
      'components.logolink': ComponentsLogolink;
      'components.menulink': ComponentsMenulink;
      'components.provide': ComponentsProvide;
      'components.socail-link': ComponentsSocailLink;
      'components.solution': ComponentsSolution;
    }
  }
}
