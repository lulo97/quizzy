/*
_User {
  id: 'user_2Y1bR9vyshAAdu8GX5RUuUOmqi4',
  passwordEnabled: false,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  banned: false,
  createdAt: 1699696021093,
  updatedAt: 1702800284932,
  imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWTFiUjlvVUJMMElPUFJMSWdrNXhxM2FwVEUifQ',
  hasImage: true,
  gender: '',
  birthday: '',
  primaryEmailAddressId: 'idn_2Y1bQuxCdRxq2jFdWBHeYe9fyC5',
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  lastSignInAt: 1702800284930,
  externalId: null,
  username: null,
  firstName: 'Mộng',
  lastName: 'Kỳ',
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [
    _EmailAddress {
      id: 'idn_2Y1bQuxCdRxq2jFdWBHeYe9fyC5',
      emailAddress: 'luongpysl2@gmail.com',
      verification: [_Verification],
      linkedTo: [Array]
    }
  ],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: [
    _ExternalAccount {
      id: 'idn_2Y1bQrN2lcTEKf48a3WLpe3ORAE',
      provider: undefined,
      identificationId: undefined,
      externalId: undefined,
      approvedScopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
      emailAddress: 'luongpysl2@gmail.com',
      firstName: undefined,
      lastName: undefined,
      imageUrl: undefined,
      username: null,
      publicMetadata: {},
      label: null,
      verification: [_Verification]
    }
  ]
}
*/

interface _Verification {
    // Define properties of _Verification if available
  }
  
  interface _EmailAddress {
    id: string;
    emailAddress: string;
    verification: _Verification[]; // You might need to define _Verification
    linkedTo: any[]; // You might need to define the type of linkedTo array
  }
  
  interface _ExternalAccount {
    id: string;
    provider?: any; // You might need to define the type of provider
    identificationId?: any; // You might need to define the type of identificationId
    externalId?: any; // You might need to define the type of externalId
    approvedScopes: string;
    emailAddress: string;
    firstName?: any; // You might need to define the type of firstName
    lastName?: any; // You might need to define the type of lastName
    imageUrl?: any; // You might need to define the type of imageUrl
    username: string | null; // You might need to define the type of username
    publicMetadata: Record<string, any>;
    label: string | null; // You might need to define the type of label
    verification: _Verification[];
  }
  
  interface _User {
    id: string;
    passwordEnabled: boolean;
    totpEnabled: boolean;
    backupCodeEnabled: boolean;
    twoFactorEnabled: boolean;
    banned: boolean;
    createdAt: number;
    updatedAt: number;
    imageUrl: string;
    hasImage: boolean;
    gender: string;
    birthday: string;
    primaryEmailAddressId: string;
    primaryPhoneNumberId: string | null; // You might need to define the type of primaryPhoneNumberId
    primaryWeb3WalletId: string | null; // You might need to define the type of primaryWeb3WalletId
    lastSignInAt: number;
    externalId: string | null; // You might need to define the type of externalId
    username: string | null;
    firstName: string;
    lastName: string;
    publicMetadata: Record<string, any>;
    privateMetadata: Record<string, any>;
    unsafeMetadata: Record<string, any>;
    emailAddresses: _EmailAddress[];
    phoneNumbers: any[]; // You might need to define the type of phoneNumbers array
    web3Wallets: any[]; // You might need to define the type of web3Wallets array
    externalAccounts: _ExternalAccount[];
  }
  
