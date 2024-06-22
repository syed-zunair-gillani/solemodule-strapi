import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionsAttributes extends Schema.Component {
  collectionName: 'components_sections_attributes';
  info: {
    displayName: 'Attribute';
    description: '';
  };
  attributes: {
    Width: Attribute.Decimal;
    Height: Attribute.Decimal;
    Length: Attribute.Decimal;
    Weight: Attribute.Decimal;
    Color: Attribute.String;
    Features: Attribute.String;
  };
}

export interface SectionsOtherAttribute extends Schema.Component {
  collectionName: 'components_sections_other_attributes';
  info: {
    displayName: 'Other Attribute';
  };
  attributes: {
    Name: Attribute.String;
    Value: Attribute.String;
  };
}

export interface SectionsString extends Schema.Component {
  collectionName: 'components_sections_strings';
  info: {
    displayName: 'String';
  };
  attributes: {
    Tags: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sections.attributes': SectionsAttributes;
      'sections.other-attribute': SectionsOtherAttribute;
      'sections.string': SectionsString;
    }
  }
}
