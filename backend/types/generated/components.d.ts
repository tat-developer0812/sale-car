import type { Schema, Struct } from '@strapi/strapi';

export interface CarSpecs extends Struct.ComponentSchema {
  collectionName: 'components_car_specs';
  info: {
    description: 'Car specifications component';
    displayName: 'Specifications';
    icon: 'cog';
  };
  attributes: {
    acceleration: Schema.Attribute.String;
    airbags: Schema.Attribute.Integer;
    brakes: Schema.Attribute.String;
    climateControl: Schema.Attribute.String;
    curbWeight: Schema.Attribute.Integer;
    driveType: Schema.Attribute.String;
    engine: Schema.Attribute.String;
    fuelConsumption: Schema.Attribute.String;
    fuelTankCapacity: Schema.Attribute.Integer;
    groundClearance: Schema.Attribute.Integer;
    height: Schema.Attribute.Integer;
    infotainment: Schema.Attribute.String;
    length: Schema.Attribute.Integer;
    other: Schema.Attribute.JSON;
    power: Schema.Attribute.String;
    safetyFeatures: Schema.Attribute.JSON;
    seats: Schema.Attribute.Integer;
    speakers: Schema.Attribute.Integer;
    suspension: Schema.Attribute.Text;
    tires: Schema.Attribute.String;
    topSpeed: Schema.Attribute.String;
    torque: Schema.Attribute.String;
    trunkCapacity: Schema.Attribute.Integer;
    wheelbase: Schema.Attribute.Integer;
    width: Schema.Attribute.Integer;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'car.specs': CarSpecs;
      'shared.seo': SharedSeo;
    }
  }
}
